migrate:
	cd infra; npx sequelize-cli db:migrate --debug

drop-migration:
	cd infra; npx sequelize-cli db:migrate:undo:all --debug

seed:
	cd infra; npx sequelize-cli db:seed:all --debug
	
drop-seeds:
	cd infra; npx sequelize-cli db:seed:undo:all --debug