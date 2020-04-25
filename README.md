# TabT-GraphQL server
> Graph-QL replacement of the TabT Soap Api.

This is a GraphQL server that allows you to fetch data from TabT. 

![](voyager.png)

## Installation

This server run with Node 10 & higher. A .env file must be created.

```sh
git clone https://github.com/Fllorent0D/Tabt-GraphQL
npm install
npm run build
node ./dist/index.js
```

### Start with pm2

```sh
pm2 start ./dist/index.js
```


## Development setup

```sh
npm run start
```

## Release History

* 0.0.1
    * Work in progress

## Meta

Cardoen Florent – [@YourTwitter](https://twitter.com/fllorent0D) – f.cardoen@me.com

## Contributing

1. Fork it (<https://github.com/yourname/yourproject/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
