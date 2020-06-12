# gutenberg_indexer
Sample Code

## Initial Setup
### Download the necessary files
```
wget https://www.gutenberg.org/cache/epub/feeds/rdf-files.tar.zip; 
unzip rdf-files.tar.zip; 
rm -rf rdf-files.tar.zip;
tar -xvf rdf-files.tar;
rm -rf rdf-files.tar;

```

### Setup the npm modules
```
npm install --dev
```


## Setup the DB
config.js in the src directory should be used to configure the database. As of now we support postgres.
After configuring the required values run the below command to setup tables.
```
npm run init_db
```
The above command shall create the table in the database. This will not create the database itself. We assume the database configured is already present in the db.

## Parse the files
```
npm run parse_all
```
The above command will start parsing all the files and save them in the db.

## Optimizing concurrency
We currently use bluebird promises to manage concurrent execution.
PROMISE_CONCURRENCY can be used to fine tune the concurrency as per the hardware available.

## TODO
- [ ] Add npm task to download all required gutenberg files.
- [ ] Add more tests.

## Running tests
```
npm run test
```

## Test Coverage
```
npm run test_coverage
```

## Assumptions
- A basic assumption of this architecture is that all the processing needs to be done on the same machine.
- When needed to scale beyond a single machine, queing systems shall be used.
- Downloading gutenberg files is not part of the actual code component.

