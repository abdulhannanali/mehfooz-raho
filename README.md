# Mehfooz.xyz Source Code

This is a repository that contains source code for [Mehfooz.xyz](https://mehfooz.xyz), an application 
that's supposed to make searching vaccination centres near you in Pakistan a lot easier. The front-end and accompanying 
back-end functions both are hosted on Netlify.

## Components

The site is based on following components

- Front-End
- Functions
- Parser


### Front-End

Source code for front-end is available in [src](src/) directory and is built using React/Redux/Typescript

### Functions

Source code for the serverless functions is available in [netlify/functions](netlify/functions) directory
and the underlying platform is Netlify Functions

### Parser

The parser is based in another repository and is responsible for fetching the relevant data from Google Places API and parsing the vaccination centres data from the raw format. The parser and it's data can
be accessed at https://github.com/abdulhannanali/covid-vaccination-centres-parser-pk

#### LICENSE

Licensed under Apache License 2.0. See [LICENSE](./LICENSE) for more details