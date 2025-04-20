import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import Link from 'next/link';

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);

    const model = [
        {
            label: 'Home',
            items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
        },
        {
            label: 'Admin DirtyCoins',
            items: [
                { label: 'khách hàng', icon: 'pi pi-fw pi-id-card', to: '/pages/User' },
                { label: 'Loại sản phẩm', icon: 'pi pi-fw pi-list', to: '/pages/ProductCategory' },
                { label: 'Sản phẩm', icon: 'pi pi-fw pi-inbox', to: '/pages/Product' },
                { label: 'Đánh giá sản phẩm', icon: 'pi pi-fw pi-comments', to: '/pages/Review' },
                { label: 'Đơn hàng', icon: 'pi pi-fw pi-shopping-cart', to: '/pages/Order' },
                { label: 'Thống kê', icon: 'pi pi-fw pi-chart-pie', to: '/uikit/button', class: 'rotated-icon' }
            ]
        },
        {
            label: 'Get Started',
            items: [
                {
                    label: 'Documentation',
                    icon: 'pi pi-fw pi-question',
                    to: '/documentation'
                },
                {
                    label: 'View Source',
                    icon: 'pi pi-fw pi-search',
                    url: 'https://github.com/primefaces/sakai-react',
                    target: '_blank'
                }
            ]
        }
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}

                <Link href="https://www.primefaces.org/primeblocks-react" target="_blank" style={{ cursor: 'pointer' }}>
                    <img alt="Prime Blocks" className="w-full mt-3" src={`/layout/images/banner-primeblocks${layoutConfig.colorScheme === 'light' ? '' : '-dark'}.png`} />
                </Link>
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
