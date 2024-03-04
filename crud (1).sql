-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 04, 2024 at 02:55 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crud`
--

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `ID` int(11) NOT NULL,
  `Name` varchar(20) NOT NULL,
  `Email` varchar(30) NOT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`ID`, `Name`, `Email`, `deletedAt`) VALUES
(129, 'asdf', 'hitesh111.v11erma@rishabhsoft.', '2024-03-01 11:08:13'),
(130, 'admin2', 'hitesh.verma@rishabhsoft.com', '2024-03-01 11:09:33'),
(131, 'admin', 'hitesh.verma@rishabhsoft.com', '2024-03-01 11:24:55'),
(132, 'admin', 'hitesh.verma@rishabhsoft.com', '2024-03-01 11:24:57'),
(133, 'admin', 'hitesh.verma@rishabhsoft.com', '2024-03-01 11:09:36'),
(134, 'asdf', 'hitesh.verma@rishabhsoft.com', '2024-03-01 11:24:58'),
(135, 'sdaf', 'hitesh.verma@rishabhsoft.com', '2024-03-01 11:24:59'),
(136, 'asdf', 'hitesh.verma@rishabhsoft.com', '2024-03-01 11:25:00'),
(137, 'asfd', 'hitesh.verma@rishabhsoft.com', '2024-03-01 11:25:02'),
(138, 'asdf', 'hitesh.verma@rishabhsoft.com', '2024-03-01 11:25:03'),
(139, 'admin', 'hitesh.verma@rishabhsoft.com', '2024-03-01 11:25:07'),
(140, 'mandeep', 'mandeep.singh@rishabhsoft.com', '2024-03-01 11:11:12'),
(141, 'verma', 'verma@gmail.com', '2024-03-01 11:13:20'),
(142, 'jaye', 'jaye@gmail.com', '2024-03-01 11:14:21'),
(143, 'a', 'hitesh.verma@rishabhsoft.com', NULL),
(144, 'b', 'hitesh.verma@rishabhsoft.com', NULL),
(145, 'c', 'hitesh.verma@rishabhsoft.com', NULL),
(146, 'd', 'hitesh.verma@rishabhsoft.com', '2024-03-01 12:51:45'),
(147, 'e', 'hitesh.verma@rishabhsoft.com', NULL),
(148, 'f', 'hitesh.verma@rishabhsoft.com', NULL),
(149, 'g', 'hitesh.verma@rishabhsoft.com', NULL),
(150, 'h', 'hitesh.verma@rishabhsoft.com', NULL),
(151, 'maniK', 'mani1@mani.com', '2024-03-01 13:54:58'),
(152, 'admin', 'asdfsdf@sdaf.com', NULL),
(153, 'admin', 'hitesh.verma@rishabhsoft.com', NULL),
(154, 'admin', 'hitesh.verma@rishabhsoft.com', NULL),
(155, 'admin', 'hitesh.verma@rishabhsoft.com', NULL),
(156, 'admin', 'hitesh.verma@rishabhsoft.com', NULL),
(157, 'admin', 'hitesh.verma@rishabhsoft.com', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=158;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
