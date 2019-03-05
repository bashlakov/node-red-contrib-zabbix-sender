module.exports = function (RED) {
	'use strict'

	var ZabbixSender = require('node-zabbix-sender');

	function ZabbixSenderNode (config) {
		RED.nodes.createNode(this, config)
		var node = this
		node.config = config
		node.sender = new ZabbixSender({
			host: node.config.zabbixServer,
			port: node.config.zabbixPort,
			timeout: node.config.timeout,
			with_ns: node.config.withNs,
			with_timestamps: node.config.sendTimestamps,
			items_host: node.config.defaultHostname
		});

		this.on('input', function (msg) {
			var data = msg.payload

			if (!Array.isArray(data)){
				this.error("Incorrect payload, must be an array", msg);
				return;
			} else if (data.length == 0){
				this.error("Payload is empty", msg);
				return;
			} else {
				if (Array.isArray(data[0])){
					for (var i in data){
						try {
							node.sender.addItem(...data[i]);
						}catch(err) {
                    		this.error(err, msg);
							return;
                		}
					}
				} else {
					try {
						node.sender.addItem(...data)
					}catch(err) {
                		this.error(err, msg);
						return;
            		}
				}
				
				var that = this;
				node.sender.send(function(err, res) {
			    			if (err) {
			        			that.error(err, msg);
								return;
			    			}
			    			that.log(res, msg);
				});
			}
		})
	}
	RED.nodes.registerType('zabbix-sender', ZabbixSenderNode)
}
