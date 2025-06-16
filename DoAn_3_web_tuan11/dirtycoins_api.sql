-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 16, 2025 at 10:10 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dirtycoins_api`
--

-- --------------------------------------------------------

--
-- Table structure for table `guest`
--

CREATE TABLE `guest` (
  `guest_id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `address` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `guest`
--

INSERT INTO `guest` (`guest_id`, `email`, `fullname`, `phone_number`, `address`) VALUES
(1, 'Djjdd197@gmail.com', 'Ngọc Anh đẹp zai', '0339706393', 'yEDNACNSDC'),
(2, 'thang2006ss@gmail.com', 'Ngọc Anh đẹp zai', '4535252', 'Yeên lịch'),
(3, 'thang2006ss@gmail.com', 'Ngọc Anh đẹp zai', '4535252', 'Yeên lịch'),
(4, 'Djjdd197@gmail.com', 'Ngọc Anh đẹp zai', '0339706393', 'yEDNACNSDC'),
(5, 'thang2006ss@gmail.com', 'Ngọc Anh đẹp zai', '4535252', 'Yeên lịch'),
(6, 'thang2006ss@gmail.com', 'Ngọc Anh đẹp zai', '4535252', 'Yeên lịch'),
(7, 'thang2006ss@gmail.com', 'Ngọc Anh đẹp zai', '4535252', 'Yeên lịch'),
(8, 'thang2006ss@gmail.com', 'Ngọc Anh đẹp zai', '4535252', 'Yeên lịch'),
(9, 'thang2006ss@gmail.com', 'Ngọc Anh đẹp zai', '4535252', 'Yeên lịch');

-- --------------------------------------------------------

--
-- Table structure for table `orderdetails`
--

CREATE TABLE `orderdetails` (
  `order_detail_id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `size` enum('XS','S','M','L','XL') NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `orderdetails`
--

INSERT INTO `orderdetails` (`order_detail_id`, `order_id`, `product_id`, `size`, `quantity`, `price`) VALUES
(71, 50, 4, 'S', 1, 399000.00),
(72, 50, 5, 'M', 1, 720000.00),
(73, 51, 4, 'S', 1, 399000.00),
(74, 52, 5, 'M', 1, 720000.00),
(75, 53, 5, 'M', 6, 4320000.00);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `order_date` datetime NOT NULL DEFAULT current_timestamp(),
  `total_amount` decimal(10,2) NOT NULL,
  `status` enum('pending','completed','canceled') NOT NULL,
  `guest_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `order_date`, `total_amount`, `status`, `guest_id`) VALUES
(50, 2, '2025-06-16 06:38:44', 1119000.00, 'completed', NULL),
(51, 2, '2025-06-16 06:38:49', 399000.00, 'completed', NULL),
(52, 2, '2025-06-16 06:44:43', 720000.00, 'completed', NULL),
(53, 2, '2025-06-16 14:57:54', 4320000.00, 'pending', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `payment_id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `payment_date` datetime NOT NULL DEFAULT current_timestamp(),
  `payment_method` enum('chuyển khoản ngân hàng','thanh toán tiền mặt khi nhận hàng') DEFAULT NULL,
  `payment_status` enum('pending','completed') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`payment_id`, `order_id`, `payment_date`, `payment_method`, `payment_status`) VALUES
(36, 50, '2025-06-16 06:38:59', 'thanh toán tiền mặt khi nhận hàng', 'completed'),
(37, 51, '2025-06-16 06:39:02', 'thanh toán tiền mặt khi nhận hàng', 'completed'),
(38, 52, '2025-06-16 06:44:49', 'thanh toán tiền mặt khi nhận hàng', 'completed'),
(39, 53, '2025-06-16 14:57:54', 'thanh toán tiền mặt khi nhận hàng', 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `productcategories`
--

CREATE TABLE `productcategories` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `category_description` text DEFAULT NULL,
  `category_banner` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `productcategories`
--

INSERT INTO `productcategories` (`category_id`, `category_name`, `category_description`, `category_banner`) VALUES
(1, 'T-Shirts', 'Áo thun thời trang đường phố', 'https://res.cloudinary.com/dtbyoxe5k/image/upload/v1743135395/eeob9856v99de2xhcv49.png'),
(2, 'Hoodies', 'Áo hoodie phong cách streetwear', 'https://res.cloudinary.com/dtbyoxe5k/image/upload/v1743135404/kqkjfpdhucgxqnafrmgz.png'),
(3, 'Accessories', 'Phụ kiện thời trang đa dạng', 'https://res.cloudinary.com/dtbyoxe5k/image/upload/v1743135414/tz2ajrsjjtct6e28esff.png'),
(4, 'Bags', 'các loại balo, túi xách thời trang\r\n', 'https://res.cloudinary.com/dtbyoxe5k/image/upload/v1743135424/jiyplxnufwduefcwnmvr.png');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `product_name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `category_id`, `product_name`, `description`, `price`, `image_url`) VALUES
(4, 1, 'DC x The Underdogs T-shirt Black', 'Áo thun đen hợp tác giữa DirtyCoins và The Underdogs', 399000.00, 'https://res.cloudinary.com/dtbyoxe5k/image/upload/v1743126001/hdf5q2rivnceedgwypuh.png'),
(5, 2, 'Masew Play To Win Hoodie - Grey', 'Áo hoodie xám hợp tác với Masew', 720000.00, 'https://res.cloudinary.com/dtbyoxe5k/image/upload/v1743126008/vy9ddo7nqtw8fy1mor1j.png'),
(6, 4, 'Logo Patched Heart Mini Pouch Red', 'Túi nhỏ màu đỏ với logo trái tim', 299000.00, 'https://res.cloudinary.com/dtbyoxe5k/image/upload/v1743125950/lplhjflgdvj5mgubpeev.png'),
(7, 1, 'DC DBZ Dragon Team T-Shirt - Cream', 'Áo thun đen hợp tác giữa DirtyCoins và DBZ', 399000.00, 'https://res.cloudinary.com/dtbyoxe5k/image/upload/v1743126031/o0jxai5fatvam2jdyc8i.png'),
(8, 4, 'DirtyCoins Logo Patches Crossbody Bag Black', 'Chi tiết sản phẩm: . Kích thước túi lớn: 13 x 19.5 x 6.5 (cm). Kích thước túi phụ nhỏ: 11.5 x 7 x 2.5 (cm). Chất liệu bên ngoài: Da tổng hợp; Chất liệu lót: Polyester. Dây đeo có thể điều chỉnh được độ dài. Mặt trước túi sửa dụng kĩ thuật đắp mảnh da. Mặt trước túi nhỏ được đính label kim loại.', 590000.00, 'https://res.cloudinary.com/dtbyoxe5k/image/upload/v1743125574/mbvqvik3frhkjmuszbe2.png'),
(13, 1, 'Y Patch Crochet Polo Black', 'Chi tiết sản phẩm - Kích thước: M - L - XL - Chất liệu: vải dệt crochet - Patch logo trước ngực áp dụng kĩ thuật thêu 2D  Mẫu cao 1m75 nặng 54kg mặc size L.  Size Chart:  Mẫu nữ cao 1m58 nặng 44kg mặc sản phẩm size M', 420000.00, 'https://res.cloudinary.com/dtbyoxe5k/image/upload/v1743475385/fsopygttpjcyfccp2svq.png'),
(14, 1, 'Speed D LS T-Shirt - White', 'Chi tiết sản phẩm: • Kích thước: M - L - XL • Chất liệu: Cotton. • Regular Fit. • Hình in mặt trước áo áp dụng kĩ thuật in lụa.', 400000.00, 'https://res.cloudinary.com/dtbyoxe5k/image/upload/v1743476258/fpov69pgvxxbkmfte5n9.png'),
(15, 1, 'Mate T-shirt - Black', 'Chi tiết sản phẩm: • Chất liệu: Cotton 2 chiều. • Regular Fit. • Hình in trên mặt trước và sau áp áp dụng công nghệ in kéo lụa.', 390000.00, 'https://res.cloudinary.com/dtbyoxe5k/image/upload/v1743477144/jxnn4p8pndk16qnxml6x.png'),
(16, 4, 'Letters Monogram Denim Backpack - Black', 'Chi tiết sản phẩm: • Ba lô form cơ bản, ngăn mở bằng khóa kéo. • Chất liệu mặt ngoài: Cotton Denim . • Chất liệu lót: vải poly. • Lòng trong ba lô có thể đựng vừa laptop 15.6\'\'. • Đầu khóa kéo có dập logo chữ Y. • Pattern monogram được dệt trên bề mặt vải thân balo và quai đeo. • Kích thước: Ngang x Rộng x Cao: 32 x 13 x 44 cm', 720000.00, 'https://res.cloudinary.com/dtbyoxe5k/image/upload/v1743477233/h8yhkn0pilxpqnyyhkv4.png'),
(17, 4, 'Dico Wavy Backpack V3', 'Chi tiết sản phẩm: • Ba lô form cơ bản, ngăn mở bằng khóa kéo. • Chất liệu mặt ngoài: da PU cao cấp . • Chất liệu lót: vải poly. • Lòng trong ba lô có thể đựng vừa laptop 15.6\'\'. • Đầu khóa kéo có dập logo chữ Y. • Dây đai đeo vai có dệt chìm logo DirtyCoins. • Mặt trước ba lô thêu logo DirtyCoins Wavy. • Kích thước: Ngang x Rộng x Cao: 32 x 13 x 44 cm', 650000.00, 'https://res.cloudinary.com/dtbyoxe5k/image/upload/v1743477515/w18xvn6mjyfx2ew4azee.png');

-- --------------------------------------------------------

--
-- Table structure for table `product_variants`
--

CREATE TABLE `product_variants` (
  `variant_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `size` enum('XS','S','M','L','XL') NOT NULL,
  `stock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `product_variants`
--

INSERT INTO `product_variants` (`variant_id`, `product_id`, `size`, `stock`) VALUES
(1, 4, 'M', 4),
(3, 4, 'XL', 20),
(5, 4, 'S', 21),
(6, 4, 'L', 34),
(9, 4, 'XS', 9),
(10, 5, 'M', 43),
(11, 6, 'S', 45),
(12, 6, 'XS', 242),
(13, 14, 'XS', 34),
(14, 17, 'XL', 2425),
(15, 16, 'XS', 3252),
(16, 13, 'XS', 5),
(17, 17, 'L', 57),
(18, 15, 'XL', 2424),
(19, 8, 'M', 67),
(20, 7, 'XL', 67);

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `review_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL CHECK (`rating` between 1 and 5),
  `comment` text DEFAULT NULL,
  `review_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`review_id`, `product_id`, `user_id`, `rating`, `comment`, `review_date`) VALUES
(24, 5, 2, 5, 'ngọc anh', '2025-06-16 13:45:15');

-- --------------------------------------------------------

--
-- Table structure for table `shipping`
--

CREATE TABLE `shipping` (
  `shipping_id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `shipping_address` text NOT NULL,
  `shipping_status` enum('pending','shipped','delivered') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `shipping`
--

INSERT INTO `shipping` (`shipping_id`, `order_id`, `shipping_address`, `shipping_status`) VALUES
(36, 50, 'Yên Lịch - Dân Tiến', 'pending'),
(37, 51, 'Yên Lịch - Dân Tiến', 'pending'),
(38, 52, 'Yên Lịch - Dân Tiến', 'pending'),
(39, 53, 'Yên Lịch - Dân Tiến', 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `fullname` text DEFAULT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `role` enum('user','admin') NOT NULL,
  `address` text DEFAULT NULL,
  `image_user` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `fullname`, `username`, `password`, `email`, `phone_number`, `role`, `address`, `image_user`) VALUES
(1, 'át văn min', 'Admin', '123', 'Admin@example.com', '0123456789', 'admin', NULL, NULL),
(2, 'Ngọc Anh', 'User', '123', 'User@example.com', '0339706393', 'user', 'Yên Lịch - Dân Tiến', 'https://res.cloudinary.com/dtbyoxe5k/image/upload/v1742531567/tjrwlscivehlcmknpg6m.jpg'),
(6, 'thúy hằng', 'User2', '123', 'Djjdd197@gmail.com', '0339706393', 'user', 'Nghĩa Trụ - Văn Giang\r\n', 'https://res.cloudinary.com/dtbyoxe5k/image/upload/v1742633676/ljjcxxiurwrla9dyhsfz.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `guest`
--
ALTER TABLE `guest`
  ADD PRIMARY KEY (`guest_id`);

--
-- Indexes for table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD PRIMARY KEY (`order_detail_id`),
  ADD KEY `FK_OrderID` (`order_id`),
  ADD KEY `FK_ProductID` (`product_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `FK_UserID` (`user_id`),
  ADD KEY `fk_orders_guest` (`guest_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `FK_OrderID_Payment` (`order_id`);

--
-- Indexes for table `productcategories`
--
ALTER TABLE `productcategories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `FK_CategoryID` (`category_id`);

--
-- Indexes for table `product_variants`
--
ALTER TABLE `product_variants`
  ADD PRIMARY KEY (`variant_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`review_id`),
  ADD KEY `FK_ProductID_Review` (`product_id`),
  ADD KEY `FK_UserID_Review` (`user_id`);

--
-- Indexes for table `shipping`
--
ALTER TABLE `shipping`
  ADD PRIMARY KEY (`shipping_id`),
  ADD KEY `FK_OrderID_Shipping` (`order_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `guest`
--
ALTER TABLE `guest`
  MODIFY `guest_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `orderdetails`
--
ALTER TABLE `orderdetails`
  MODIFY `order_detail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `productcategories`
--
ALTER TABLE `productcategories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `product_variants`
--
ALTER TABLE `product_variants`
  MODIFY `variant_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `review_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `shipping`
--
ALTER TABLE `shipping`
  MODIFY `shipping_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD CONSTRAINT `FK_OrderID` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_ProductID` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `FK_UserID` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_orders_guest` FOREIGN KEY (`guest_id`) REFERENCES `guest` (`guest_id`);

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `FK_OrderID_Payment` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `FK_CategoryID` FOREIGN KEY (`category_id`) REFERENCES `productcategories` (`category_id`) ON DELETE SET NULL;

--
-- Constraints for table `product_variants`
--
ALTER TABLE `product_variants`
  ADD CONSTRAINT `product_variants_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `FK_ProductID_Review` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_UserID_Review` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `shipping`
--
ALTER TABLE `shipping`
  ADD CONSTRAINT `FK_OrderID_Shipping` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
