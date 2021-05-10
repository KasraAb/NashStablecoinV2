const {Application,configDevnet,HTTPAPIPlugin,utils,genesisBlockDevnet} = require('lisk-sdk');
const {NashModule} = require('./nash_module');
const {NashAPIPlugin} = require('./nash_plugin');


genesisBlockDevnet.header.timestamp = 1605699440;
genesisBlockDevnet.header.asset.accounts = genesisBlockDevnet.header.asset.accounts.map(
	(account) =>
		utils.objects.mergeDeep({}, account, {
			nashStablecoin: {
				nash: {
					balance: 0,
				},
				bonds:{
					list:[],
				},
				share: {
					balance: 0,
				},
			},
		}),
);


const appConfig = utils.objects.mergeDeep({}, configDevnet, { 
    label: 'nashStablecoin-app',
    genesisConfig: { communityIdentifier: 'NASH' },
	logger: {
		consoleLogLevel: 'info',
	},
	rpc: {
        enable: true,
        mode: 'ws',
        port: 8888,
    },
});
const app = Application.defaultApplication(genesisBlockDevnet, appConfig); 

app.registerModule(NashModule);
app.registerPlugin(NashAPIPlugin);
app.registerPlugin(HTTPAPIPlugin);

app 
	.run()
	.then(() => app.logger.info('App started...'))
	.catch(error => {
		console.error('Faced error in application', error);
		process.exit(1);
	});