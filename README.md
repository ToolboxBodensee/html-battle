# html battle

We wrote this tool for an event at [Toolbox Bodensee](http://toolbox-bodensee.de/).

## Get Started
html-battle is based on [Node.js](https://nodejs.org/) and uses [npm](https://www.npmjs.com/). Make sure you have installed it.

Once you have cloned `html-battle`, install the packages by running

```bash
$ cd html-battle
$ npm install
```

You will notice a new directory `node_modules` containing the installed packages. Next, you may have to install the dependencies using [Bower](https://bower.io/) (which has been installed in the previous step). Therefore, run

```bash
$ cd public
$ bower install
```

Finally,
```bash
# Start the server, e.g. node server.js -p 8888 -h localhost
$ node server.js [-p <port>, default: 8080] [-h <hostname>, default: 192.168.178.55]
```
will start the server on the given `port` and `hostname`.

## Features

* Usernames
* Points
* Quests
* Locking

## Authors

* [Thomas Kekeisen](https://github.com/blaues0cke)
* [Michael Malura](https://github.com/maluramichael)
* [Jochen Klein](https://github.com/jochenklein)
