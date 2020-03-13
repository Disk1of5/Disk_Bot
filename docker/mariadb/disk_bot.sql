create schema disk_bot collate latin1_swedish_ci;
use disk_bot;
create table chat_log
(
	id int auto_increment
		primary key,
	channel tinytext null,
	user tinytext null,
	message text null,
	timestamp timestamp default current_timestamp() null
);

