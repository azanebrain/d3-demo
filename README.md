# SPARQLverse D3 Demo

This project explores using [D3 JS](http://d3js.org) to visualize SPARQL queries run by [SPARQLverse](http://SPARQLCity.com)

# Use

Download the most recent release, or clone this repo and run with grunt:

```
npm install
npm run serve
```

Build a production ready package to deploy to a server with `npm run build`

# Setup

Make a copy of `config.json.sample` named `config.json`

Run `npm install`

## Load the movie dataset

Upload the datafile (linkedmdb-latest-dump.zip) to the server in the ~/data/movie directory
Unzip the dataset
unzip ~/data/movie/linkedmdb-latest-dump.zip
Load the movie dataset
LOAD <file:/home/scl/data/movie/linkedmdb-latest-dump.nt> INTO GRAPH <movie>

# File structure

Views
Includes
Queries

## Other Notes

Using the [ZF5](https://github.com/juliancwirko/generator-zf5) yeoman generator

# Resources & Third Party Tools

- [D3](http://d3js.org/)
- [D3SPARQL](http://biohackathon.org/d3sparql)
- Linked Movie Dataset from [datahub](http://datahub.io/dataset/linkedmdb/resource/dd7619f9-cc39-47eb-a72b-5f34cffe1d16) ([Creative Commons Attribution ](http://opendefinition.org/licenses/cc-by/))
- [Font Awesome](http://fontawesome.io)

# LICENSE

SPARQLverse D3
Copyright (C) 2015 SPARQL City

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
