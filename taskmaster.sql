SQLite format 3   @    �                                                              � ._� " �H�%t"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        P++Ytablesqlite_sequencesqlite_sequenceCREATE TABLE sqlite_sequence(name,seq)�.�/tablesessionssessionsCREATE TABLE sessions (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		uuid STRING NOT NULL,
		email STRING,
		user_id INTEGER,
		created_at DATETIME)~�WtablecolorscolorsCREATE TABLE colors(
		id INTEGER PRIMARY KEY,
		name string,
		status string,
		created_at datetime)� !!�tablecategoriescategoriesCREATE TABLE categories(
		id INTEGER PRIMARY KEY,
		name string,
		color_id INTEGER,
		user_id INTEGER,
		created_at datetime)�S�tabletaskstasksCREATE TABLE tasks(
		id INTEGER PRIMARY KEY,
		title string,
		user_id INTEGER,
		category_id INTEGER,
		status boolean,
		start_time datetime,
		end_time datetime,
		created_at datetime)�,�7tableusersusersCREATE TABLE users(
		id INTEGER PRIMARY KEY,
		uuid string not null unique,
		name string,
		email string,
		password string,
		created_at datetime))= indexsqlite_autoindex_users_1users          y y                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               � U']M326093d4-349b-11ed-a38d-76f726d9817dtesttest@test.com5baa61e4c9b93f3f0682250b6cf8331b7ee68fd82022-09-15 11:07:48.812083+09:00
   � �                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              'U	326093d4-349b-11ed-a38d-76f726d9817d� 
;Q�h��"�
�
;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           p	 		KKK休憩系
2022-09-16 22:26:43.29583+09:002022-09-16 22:26:43.29583+09:002022-09-16 22:26:43.29583+09:00s	 	MMM休憩系2022-09-16 22:15:03.962065+09:002022-09-16 22:15:07.962066+09:002022-09-16 22:15:03.962066+09:00r	 9	??MHIITトレーニング2022-09-16 22:11:00+09:002022-09-16 22:11:00+09:002022-09-16 22:11:29.234757+09:00� 		MMM�fe	 #		??KGoの勉強2022-09-16 22:14:00+09:002022-09-17 03:14:00+09:002022-09-16 22:14:31.46987+09:0000t	 #		MMMGoの勉強2022-09-16 16:33:19.409566+09:002022-09-16 16:34:18.409566+09:002022-09-16 16:33:19.409566+09:00� 9	KKKHIb	 	??M睡眠2022-09-16 20:55:00+09:002022-09-17 01:55:00+09:002022-09-16 20:55:29.052188+09:00� 	MMM休e	 	??M休憩系2022-09-16 20:52:00+09:002022-09-16 20:52:00+09:002022-09-16 20:52:02.760495+09:00s	 	MMM休憩系
2022-09-16 19:12:12.574238+09:002022-09-16 20:38:21.574238+09:002022-09-16 19:12:12.574238+09:00Iq		 9	??KHIITトレーニング2022-09-16 14:35:00+09:002022-09-16 15:35:00+09:002022-09-16 14:35:36.15814+09:00f	 #		??MGoの勉強2022-09-15 22:05:00+09:002022-09-15 22:35:00+09:002022-09-15 22:05:02.860867+09:00� c%	??Mお昼休憩2022-09-16 11:01:00+09:002022-09-16 11:01:00+09:002022-09-� 	 9	MMMHIIT�p	 	MMM読書2022-09-16 17:38:41.071014+09:002022-09-16 19:09:24.071014+09:002022-09-16 17:38:41.071014+09:00   
	MMf	 #		??MGoの勉強2022-09-16 22:02:00+09:002022-09-16 22:02:00+09:002022-09-16 22:02:29.150272+09:00� OO��j2�����������                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                h /	MTEST10
2022-09-16 19:10:37.202267+09:00 �	MTEST9
2022-09-16 19:10:31.870087+09:00 k	MTEST8
2022-09-16 19:10:26.169846+09:00 =	MTEST7
2022-09-16 19:10:20.602459+09:00 	MTEST6
2022-09-16 19:10:16.068872+09:00  �	MTEST5
2022-09-16 19:10:11.937259+09:00  �	MTEST4
2022-09-16 19:10:07.887925+09:00, 	MTEST3
2022-09-16 19:09:58.605159+09:00  W	MTEST2
2022-09-? =	Mプログラミング系2022-09-15 22:03:23.255331+09:000	 	M大学系2022-09-16 16:32:58.086809+09:000   :7	3 %	Mテスト系	2022-09-16 22:12:30.743104+09:00
 	M休憩系2022-09-16 19:12:12.572288+09:00:006 +	M自己投資系2022-09-16 14:34:57.182361+09:000 	M運動系2022-09-16 14:31:19.543316+09:000 	M睡眠系2022-09-16 10:47:38.580962+09:00/ 	K大学系2022-09-16 14:00:42.81808+09:000   
� ��i2���d1�                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   0
 Mgray#9696962022-09-15 18:09:54.937516+09:001	 Mblack#3232322022-09-15 11:07:13.706361+09:002 Morange#E9900A2022-09-15 11:07:13.705915+09:001 Mbrown#784C292022-09-15 11:07:13.705428+09:002 Myellow#E1E12F2022-09-15 11:07:13.704942+09:001 Mgreen#3791372022-09-15 11:07:13.704424+09:005 Mbluegreen#12BEB22022-09-15 11:07:13.703577+09:000 Mblue#1F80C62022-09-15 11:07:13.703077+09:002 Mpurple#9C169C2022-09-15 11:07:13.702695+09:00/ Mred#DF13132022-09-15 11:07:13.702191+09:00   � �                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             W U'	M3260d678-349b-11ed-a38d-76f726d9817dtest@test.com2022-09-15 11:07:48.813581+09:00   � �                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         	sessions