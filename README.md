# Graphic
Inspired by [Grafana](http://play.grafana.org/), we have set out to improve visualizations for system information on MacOS and Linux. However, our app is ready to view CPU data out of the box, without having to connect an external database or collector like Collectd. Implementing our knowledge of Electron, Node and React, we have created an open source application to view computer metrics in an easy to view and customizable app, Graphic.

Many advanced CPU dashboards either require advanced software knowledge to implement Grafana with Collectd and a database, or the InfluxData software stack, or they're too simple and only display simple realtime data. We wanted to view our over time and watch progression with various CPU, memory and network metrics which especially interest us as developers. Graphic solves this need producing a full stack desktop app.

### Development Status
This project is currently incomplete.
[Project ruberic](https://docs.google.com/spreadsheets/d/1NnR_H7F6Ocec5QttvUbtUrtSZAw1vbfDjFquP_HYTl8/edit#gid=1688051739)

## Features

(./images/cpu_data.png)

Everything you'd want to see about your Mac or Linux machine. With the ability to customize the information you see, this app is tailored towards developers and lay users. View CPU, memory, network, temperatures, battery, disks, partitions and other system information.

## Installation
`NPM install` the dependencies. Then, `NPM start` to start the Electron app.

## To Do
- D3 graphc implementation
- Frontend in React

## Developed By
- [Sid](https://github.com/matthewsidneyjacobs)
- [Brett](https://github.com/brettinternet)
- [Jason](https://github.com/JasonMarkWomack)
- [Brayden](https://github.com/Kymbolde)

## Credits
- [systeminformation](https://github.com/sebhildebrandt/systeminformation)
- [Node-SMC](https://github.com/mmarcon/node-smc)
- [Public IP](https://github.com/sindresorhus/public-ip)
- [Electron + React help](https://github.com/chentsulin/electron-react-boilerplate)
