# MyAuctions

## Run tasks

To run the dev server for your app, use:

```sh
npx nx dev storefront
```

To create a production bundle:

```sh
npx nx build storefront
```

To see all available targets to run for a project, run:

```sh
npx nx show project storefront
```

## Database

To generate a TypeORM migration, use the following command:

```sh
nx run database:migration:generate --name <migration-name>
```

To run the migrations, use:

```sh
nx run database:migration:run
```

To revert the last migration, use:

```sh
nx run database:migration:revert
```

To show migrations status, use:

```sh
nx run database:migration:show
```
