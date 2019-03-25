# node-red-contrib-zabbix-sender
## About
Send your data to Zabbix using the Zabbix trapper protocol.
This node is the wrapper around [node-zabbix-sender](https://www.npmjs.com/package/node-zabbix-sender) library.
## Usage
To send simple item data, send message with following payload:
```
msg.payload = [
	"webserver",
	"httpd.running",
	0
]
```
You can set default hostname in node settings, then you can send just item name and value:
```
msg.payload = [
    "httpd.running",
    0
]
```
You can also send multiple items at once, just construct payload as array of arrays:
```
msg.payload = [
    [
        "dbserver",
        "mysql.ping",
        1
    ],
    [
        "webserver",
        "httpd.running",
        0
    ]
]
```
## License
Code released under the MIT License.
Zabbix logo is used under [Zabbix Trademark and Logo Usage Policy](https://www.zabbix.com/trademark).
