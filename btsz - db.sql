-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: btsz
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `date` varchar(255) NOT NULL,
  `time` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `place` varchar(255) NOT NULL,
  `team1` varchar(255) NOT NULL,
  `team2` varchar(255) NOT NULL,
  `turn` int NOT NULL,
  `season` varchar(10) NOT NULL,
  `protocol` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `events_chk_1` CHECK ((`turn` <= 15))
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,'2023-10-13','16:00','Male','Vízművek','Olajos TK A','Olajos TK B',1,'2023/2024',NULL),(21,'2023-10-20','17:30','Male','Vízművek','Olajos TK A','MVM Gáz SE B',2,'2023/2024',NULL),(24,'2023-10-27','16:00','Female','Rákoshegy','Fővárosi Vízművek B','Rákoshegyi VSE B',1,'2023/2024',NULL),(25,'2023-11-03','18:00','Male','BKV','BKV Előre B','MVM Gáz SE B',3,'2023/2024',NULL),(30,'2023-11-17','16:00','Male','Vízművek','Olajos TK A','FTC B Tartalék',4,'2023/2024',NULL),(31,'2023-11-08','16:30','Female','Rákoshegy','Rákoshegyi VSE B','Fővárosi Vízművek B',2,'2023/2024',NULL),(32,'2023-11-17','13:30','Female','FTC','FTC B','Rákoshegyi VSE B',3,'2023/2024',NULL),(33,'2023-11-24','11:00','Male','Gázművek','MVM Gáz SE B','FTC B Tartalék',5,'2023/2024',NULL),(36,'2023-11-29','16:00','Female','Rákoshegy','Rákoshegyi VSE B','FTC B',3,'2023/2024',''),(37,'2023-12-08','16:30','Female','FTC','FTC B','Fővárosi Vízművek B',4,'2023/2024',''),(38,'2023-10-13','16:30','Male','BKV','BKV Előre B','FTC B Tartalék',1,'2023/2024',''),(39,'2023-10-13','17:00','Male','Erőművek','Tüker TSE B','MVM Gáz SE B',1,'2023/2024',''),(40,'2023-10-20','16:30','Male','BKV','BKV Előre B','Olajos TK B',2,'2023/2024',''),(41,'2023-10-20','17:00','Male','FTC','FTC B Tartalék','Tüker TSE B',2,'2023/2024',''),(42,'2023-11-03','17:30','Male','FTC','FTC B Tartalék','Olajos TK B',3,'2023/2024',''),(43,'2023-11-03','15:30','Male','Vízművek','Olajos TK A','Tüker TSE B',3,'2023/2024',''),(44,'2023-11-24','16:30','Male','BKV','BKV Előre B','Olajos TK A',5,'2023/2024',''),(45,'2023-11-24','16:00','Male','Vízművek','Olajos TK B','Tüker TSE B',5,'2023/2024','');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news` (
  `content_id` bigint NOT NULL AUTO_INCREMENT,
  `cover_url` varchar(255) NOT NULL,
  `description_html` text NOT NULL,
  `highlighting_color_code` varchar(255) NOT NULL,
  `is_highlighted` bit(1) NOT NULL,
  `lead_text` varchar(255) NOT NULL,
  `published_date` datetime(6) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`content_id`),
  UNIQUE KEY `contentId_UNIQUE` (`content_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (7,'http://tekesport.hu/sites/default/files/tekesport/galeria/dsc_8093_optimized_0.jpg','<h2>Tisztelt Sporttársak!</h2>\r <p>A <strong>2023. évi Országos SENIOR Egyéni Bajnokság</strong>ra, a <strong>2023. évi Kelet-Magyarország Serdülő és Ifjúsági Leány Egyéni Bajnokság</strong>ra és a <strong>2023. évi Kelet-Magyarország Serdülő és Ifjúsági Fiú Egyéni Bajnokság</strong>ra beérkezett nevezések száma alapján a BTSZ az adott bajnokságokban nem tart budapesti selejtezőt, így minden kategóriában valamennyi benevezett játékos automatikusan továbbjut a következő fordulóba, melyek helyszíne és időpontja a <a href=\"https://www.bptekeszov.hu/files/versenyhelyszinekpdf.pdf\">mellékelt</a> &nbsp;táblázatban megtekinthető.&nbsp;</p>\r <p><br></p>','#f7b53e',_binary '','Automatikus továbbjutásra kerültek az elsőkörös nevezők!','2023-10-30 08:57:06.066000','Utánpótlás és seniorversenyek'),(8,'http://tekesport.hu/sites/default/files/tekesport/galeria/330002025_2297005153804456_3452518834674095233_n.jpg','<h2>Tisztelt Sporttársak!</h2>\n<p>Örömmel tájékoztatjuk Önöket, hogy 2023. októbertől újra elindul a Sportedző (teke sportágban) képzés a Budapesti Sportszövetségek Uniója (BSU) szervezésén belül.</p>\n<p>A Képzési Kiírás megtalálható az alábbi linkekre kattintva:&nbsp;</p>\n<ul>\n  <li><a href=\"http://bsu.hu/2023/07/05/megjelentek-a-2023-24-es-kepzesi-ev-kiirasai/\">http://bsu.hu/2023/07/05/megjelentek-a-2023-24-es-kepzesi-ev-kiirasai/</a>&nbsp;</li>\n  <li><a href=\"http://tekesport.hu/sites/default/files/basic/bsu-sportedzo-kepzes-kiiras.pdf\">BSU Sportedző (teke sportágban) képzés kiírása</a>&nbsp;</li>\n</ul>\n<p><br></p>\n<h3>KÉPZÉS MENETE</h3>\n<p>Jelentkezési határidő: <strong>2023. szeptember 20.</strong></p>\n<p>Beiratkozás: <strong>2023. szeptember 30.</strong></p>\n<p>A képzés várható kezdete: <strong>2023. október 14.</strong></p>\n<p>A képesítő vizsgák várható időpontja: <strong>2024. június</strong></p>\n<p><br></p>\n<h3>JELENTKEZÉS MÓDJA</h3>\n<p>Az online jelentkezési lap kitöltésével a <a href=\"http://kepzes.bsu.hu/jelentkezes/\">http://kepzes.bsu.hu/jelentkezes/</a> &nbsp;linkre kattintva.</p>\n<p><br></p>\n<p>A jelentkezésről visszaigazoló e-mailt nem küldenek, a „Jelentkezés beküldése” gombra kattintás után felugró „Sikeres beküldés” üzenet jelzi, hogy rendszerük fogadta a jelentkezést.</p>\n<p>Küldje be jelentkezését mihamarabb, az akár 20%-os képzési díj kedvezményért.</p>\n<p>A kedvezmények részletesen a képzési kiírásban találhatóak.</p>\n<p><br></p>\n<h3>KAPCSOLAT</h3>\n<p>Budapesti Sportszövetségek Uniója</p>\n<p>Cím: 1053 Budapest, Curia utca 3. IV. emelet/1. (Előzetes telefonos egyeztetés szükséges)</p>\n<p>Telefon: +36 70 370 7803 - Tóth Erika szakmai és képzési vezető</p>\n<p>E-mail: kepzes@bsu.hu</p>\n<p>Honlap: <a href=\"http://www.bsu.hu\">www.bsu.hu</a>&nbsp;</p>\n<p>Felnőttképzési nyilvántartási szám: E/2020/000352</p>\n<p><br></p>\n<p>Kérdés esetén keressenek minket is bizalommal.</p>\n<p>MATESZ Iroda</p>','#f7b53e',_binary '\0','Jelentkezni szeptember végéig lehet!','2023-09-02 09:03:47.507000','Sportedző képzés indul újra'),(9,'https://sportagvalaszto.hu/wp-content/uploads/2019/07/182-1505834846.jpg','<p>A <strong>MATESZ</strong> által meghirdetett és a <a href=\"https://www.bptekeszov.hu/files/202324_u14u18u23_egyeni_bajnoksag_versenykiiraspdf.pdf\">mellékelt</a> &nbsp;2023-2024. évi Utánpótlás Egyéni Bajnokság versenykiírásában foglaltak szerint kérjük a csapatokat, hogy a bajnokságra a nevezéseket (név, születési dátum megjelölésével) legkésőbb 2023.11.15-ig küldjék el az info@bptekeszov.hu e-mail-címre.&nbsp;</p>\n<p><br></p>\n<p>A bajnokság első fordulójának tervezett lebonyolítási időpontja a <strong>december 9</strong>-i hétvége, egy később meghatározott helyszínen.</p>\n<p>A további 4 forduló időpontja és helyszíne később kerül meghatározásra.</p>','#f7b53e',_binary '','Nevezési határidő: 2023.11.15','2023-11-02 10:08:28.493000','Utánpótlás egyéni bajnokság'),(10,'https://s.24.hu/app/uploads/2013/05/teke960x640-800x533.jpg','<p>A <strong>MATESZ</strong> által meghirdetett és <a href=\"https://www.bptekeszov.hu/files/2023_utanpotlas_leany_egyeni_bajnoksag_versenykiiraspdf.pdf\">mellékelt</a> &nbsp;<strong>2023. évi Kelet-Magyarország Serdülő és Ifjúsági Leány Egyéni Bajnokság</strong> versenykiírásában foglaltak szerint kérjük a csapatokat, hogy a bajnokságra a nevezéseket (név, születési dátum megjelölésével) legkésőbb <strong>2023.11.15</strong>-ig küldjék el az <em>info@bptekeszov.hu</em> e-mail-címre.</p>\n<p><br></p>\n<p>A benevezett játékosok a versenykiírás értelmében automatikus indulási jogot szereznek a <u>kelet-magyarországi döntő</u>re.</p>','#f7b53e',_binary '','Nevezési határidő: 2023.11.15.','2023-11-02 09:12:37.907000','Serdülő és ifjúsági leány egyéni bajnokság'),(11,'https://www.vitsport.hu/kepek/menupontok/8/0/teke.jpg','<p>A <strong>MATESZ</strong> által meghirdetett és mellékelt <strong>2023. évi Kelet-Magyarország Serdülő és Ifjúsági Fiú Egyéni Bajnokság</strong> versenykiírásában foglaltak szerint kérjük a csapatokat, hogy a bajnokságra a nevezéseket (név, születési dátum megjelölésével) legkésőbb<strong> 2023.11.08</strong>-ig küldjék el az <em>info@bptekeszov.hu</em> e-mail-címre.</p>\n<p><br></p>\n<p>A beérkezett nevezések számának függvényében -amennyiben szükséges- a budapesti bajnokság <strong>2023. 11. 11-12</strong>-i hétvégén kerül megrendezésre egy később meghatározott helyszínen.</p>','#f7b53e',_binary '','Nevezési határidő: 2023.11.08.','2023-10-25 09:14:24.246000','Serdülő és ifjúsági fiú egyéni bajnokság'),(12,'https://www.bptekeszov.hu/files/senior_2023_matesz_versenykiiraspdf.jpeg','<p>A <strong>MATESZ</strong> által meghirdetett és <a href=\"https://www.bptekeszov.hu/files/senior_2023_matesz_versenykiiraspdf.pdf\">mellékelt</a> &nbsp;<strong>2023. évi Országos SENIOR Egyéni Bajnokság</strong>ok versenykiírásában foglaltak szerint kérjük a bajnokságra nevező versenyzőket, hogy a nevezésüket (név, születési dátum, kategória, egyesület megjelölésével) legkésőbb <strong>2023.11.03</strong>-ig küldjék el az <em>info@bptekeszov.hu</em> e-mail-címre.</p>\n<p><br></p>\n<p>A beérkezett nevezések számának függvényében -amennyiben szükséges- a budapesti bajnokság <strong>2023. 11. 11-12</strong>-i hétvégén kerül megrendezésre egy később meghatározott helyszínen</p>','#f7b53e',_binary '','Nevezési határidő: 2023.11.03.','2023-10-20 09:16:03.894000','Senior egyéni bajnokság'),(13,'https://www.nvesz.hu/images/2261.jpg','<h4>Véget ért a X. Csapat Világbajnokság a horvátországi Varasdon.</h4>\n<p>A férfiaknál a döntőben Ausztria meglepetésre legyőzte a németeket, míg a nőknél hazai győzelem született: Horvátország az osztrákok ellen nyert a fináléban. Mind a női, mind a férfi magyar válogatott az ötödik helyet szerezte meg.</p>\n<p>A férfiak a későbbi világbajnok ellen maradtak alul, miután a negyeddöntőben 5-3-ra kikaptak, a nőket pedig a németek búcsúztatták 6-2-vel, ugyancsak a negyeddöntőben.</p>\n<p>„Mindkét válogatottunkra büszkék vagyunk. Vb-pontszerző helyen zártak, ezt a munkát kell folytatnunk. Külön szót érdemel a nők Szerbia elleni teljesítménye az utolsó csoportmeccsen, hiszen 3700 feletti fával végeztek. Ezt egyik női válogatott sem tudta megközelíteni az egész világbajnokság alatt, de természetesen a férfiak is odatették magukat.” – összegzett <em>Bátor Gábor</em>, a Magyar Teke Szövetség főtitkára.</p>\n<p><br></p>\n<figure><img src=\"https://www.nemzetisport.hu/data/cikk/2/95/96/47/cikk_2959647/teke_960px.jpg\" height=\"250px\" width=\"auto\"/></figure>\n<p><br></p>\n<p><strong>Részletes eredmények az alábbi linken tekinthetőek meg:</strong>&nbsp;</p>\n<p><a href=\"https://www.wnba-nbc.com/news/x-world-championship-national-teams-w-slash-m\">https://www.wnba-nbc.com/news/x-world-championship-national-teams-w-slash-m</a>&nbsp;</p>\n<p><br></p>','#f7b53e',_binary '\0','Ausztria és Horvátország szerezte meg a VB aranyat','2023-05-05 09:21:15.119000','Ötödik helyen végeztek a magyar válogatottak');
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `results`
--

DROP TABLE IF EXISTS `results`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `results` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `event_id` bigint NOT NULL,
  `home_name` varchar(255) NOT NULL,
  `hsumpin` int NOT NULL,
  `hsetpoints` float NOT NULL,
  `guest_name` varchar(255) NOT NULL,
  `gsumpin` int NOT NULL,
  `gsetpoints` float NOT NULL,
  PRIMARY KEY (`id`),
  KEY `results_ibfk_1` (`event_id`),
  CONSTRAINT `results_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `results`
--

LOCK TABLES `results` WRITE;
/*!40000 ALTER TABLE `results` DISABLE KEYS */;
INSERT INTO `results` VALUES (1,1,'Kovács Pista',456,2,'Magyar Lajos',502,2),(2,1,'Nagy Zoltán',422,0,'Müller Károly',544,4),(3,1,'Gombos  Bence ',534,2,'Török Flórián',534,2),(4,1,'Trefort Ágoston',578,1,'Juhász Máté',568,3),(17,24,'Németh Anita',576,2,'Gyalog Tímea',543,2),(18,24,'Zsíros Rebeka Diana',573,3.5,'Urbán Gréta',578,0.5),(19,24,'Prebán Bianka',547,3,'Wágner Eszter',531,1),(20,24,'Ádám Éva Réka',521,1,'Gáspár Enikő',569,3),(33,21,'Mikka Zoltán',564,2,'János Géza',547,2),(34,21,'Trenta Róbert',543,1,'Bánhegyi József',553,3),(35,21,'Dánki Tibor',574,3.5,'Farkas Vilmos',564,0.5),(36,21,'Fiszt Ferenc',532,2,'Altony Ákos',549,2),(37,25,'Gyékény Botond',542,2.5,'Vakanda Ferenc',523,1.5),(38,25,'Domonkos Barnabás',578,3.5,'Széll Tibor',539,0.5),(39,25,'Csonka Ádám',527,2,'Klimens Róbert',548,2),(40,25,'Trenke Márton',539,0,'Ferenc Tamás',576,4),(65,32,'Tóth Gyöngyi',547,2.5,'Csongrádi Emese',550,1.5),(66,32,'Vilmos Diana',581,3.5,'Piros Kitti',541,0.5),(67,32,'Wágner Hanna',547,2,'Kis Fanni',574,2),(68,32,'Deák Dorka',559,2,'Ferenczy Bianka',554,2),(73,38,'Kiss Péter',547,2,'Gyömbér Róbert',559,2),(74,38,'Répássy Gergely',587,3.5,'Cifrák Lajos',549,0.5),(75,38,'Wágner Tamás Béla',560,1.5,'Bálintfy Domonkos',602,2.5),(76,38,'Ábel Dániel',572,2,'Pásztor Zsigmond',568,2),(77,40,'Répássy Gergely',549,1.5,'Horváth János',566,2.5),(78,40,'Kiss Péter',555,2,'Pásztor Zsigmond',548,2),(79,40,'Ábel Dániel',578,3,'Gyömbér Róbert',567,1),(80,40,'Wágner Tamás Béla',537,1,'Cifrák Lajos',588,3),(81,39,'Gyöngyösi Zoltán',574,2.5,'Tabajdi Márk',559,1.5),(82,39,'Szénássy Botond',584,4,'Illyés Márton',547,0),(83,39,'Hajdu Iván',564,1.5,'Ferenczy Gábor',569,2.5),(84,39,'Szende Vilmos',601,2,'Nándor Szilveszter',599,2),(85,41,'Wágner Zsolt',577,1,'Nándor Szilveszter',547,3),(86,41,'Dombos József',547,0,'Németh Kálmán',574,4),(87,41,'Ferenczy Hugó',588,2,'Nemecsek Ernő',597,2),(88,41,'Bende Ákos György',614,3,'Győrffi Ottó',589,1);
/*!40000 ALTER TABLE `results` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `uploads`
--

DROP TABLE IF EXISTS `uploads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `uploads` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `access_path` varchar(255) NOT NULL,
  `event_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `event_id` (`event_id`),
  CONSTRAINT `uploads_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `uploads`
--

LOCK TABLES `uploads` WRITE;
/*!40000 ALTER TABLE `uploads` DISABLE KEYS */;
INSERT INTO `uploads` VALUES (6,'btsz\\src\\main\\resources\\uploads\\ff693b43-60cb-4bf4-a291-03745ca88f94_devil.jpg',25),(10,'btsz\\src\\main\\resources\\uploads\\a4671b87-ae6a-4342-8187-85bfcef7aa0e_devil_tanzen.png',21),(14,'btsz\\src\\main\\resources\\uploads\\f749322d-1d83-45bf-a42a-d74e27fde5b3_devil2.jpg',32),(16,'btsz\\src\\main\\resources\\uploads\\39f5c45f-7b70-4095-80c1-f6cb7083a7bf_devil4.jpg',38),(17,'btsz\\src\\main\\resources\\uploads\\65c57e9f-4ea4-47a0-ad70-e727264604ea_devil5.jpg',40),(19,'btsz\\src\\main\\resources\\uploads\\e27f8c03-8e96-4351-a409-6e68b8939a68_devil.jpg',41);
/*!40000 ALTER TABLE `uploads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(45) NOT NULL,
  `team` varchar(255) DEFAULT NULL,
  `gender` enum('Male','Female') DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `idx_team` (`team`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','ancsi.bende@gmail.com','240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9','admin',NULL,NULL),(2,'ftc_tartalek','ftc_teke@gmail.com','155993b6711009c8cb949378dfd83e48700938809ad95bcaf380b937af0683e0','teamLeader','FTC B Tartalék','Male'),(3,'rvse','rakoshegy.vse.teke@gmail.com','d3e6c19ddd8c23e619f26ef5a6eb47a73c89b5ab41b81b790bd8d8cebcf49395','teamLeader','Rákoshegyi VSE B','Female'),(4,'vizmu','fovizmu@gmail.com','a688dd7b83d18731955649a326e1581dea3619c68b7ce35103cc6769d338448d','teamLeader','Fővárosi Vízművek B','Female'),(5,'mvm_gaz_se','mvm_teke@gmail.com','f4fb1b3435c3a264b3b951a83ec9aa4166644f68ce5ad820e81b7d788bb3021d','teamLeader','MVM Gáz SE B','Male'),(6,'olajos_tk_a','olajos_A@gmail.com','1fe8fefeeb4511687a45d6e538fa1aa6dad7002b19c9720fcf95e5b82d341ec5','teamLeader','Olajos TK A','Male'),(7,'olajos_tk_b','olajosB@gmail.com','1a606d25d99cfd4e2bbaac81ede3d6fcbf003ec380166d526cf807281bfd95a2','teamLeader','Olajos TK B','Male'),(13,'bkv_elore_b','bkv_elore_sc@gmail.com','fef4c5068befb4b87fec72f34a1ee4a31d4b1acf984dc5036e341ee817d34a5e','teamLeader','BKV Előre B','Male'),(17,'ftc_b','ftcteke@gmail.com','155993b6711009c8cb949378dfd83e48700938809ad95bcaf380b937af0683e0','teamLeader','FTC B','Female'),(18,'tuker','tuker_tse_b@gmail.com','e6fd432ac8832b6b59d40f5bf89a234aa1cc7d56a9fd019a42bfaa9a09a95a2a','teamLeader','Tüker TSE B','Male');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-07 11:36:57
