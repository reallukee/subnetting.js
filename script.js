/*
    FLSM.js

    Questo progetto è distribuito sotto licenza MIT.
    Questo progetto è disponibile su GitHub.

    Repository:     https://github.com/reallukee/flsm.js/
    Descrizione:    JS
    Autore:         Luca Pollicino (https://github.com/reallukee/)
    Versione:       0.0.1
*/

var ip = 0;
var mask = 0;

var netBits;
var subnetBits;
var hostBits;

var net;
var subnet;
var host;

function subnetChange()
{
    var subnetCtrl	= document.getElementById('subnetCount');
    var hostCtrl	= document.getElementById('hostCount');
    
}


function hostChange()
{
    var subnetCtrl	= document.getElementById('subnetCount');
    var hostCtrl	= document.getElementById('hostCount');
    
}


function showIp(ip)
{
	var t = "";

	t += ((ip >> 24) & 255);
	t += ".";
	t += ((ip >> 16) & 255);
	t += ".";
	t += ((ip >> 8) & 255);
	t += ".";
	t += ((ip >> 0) & 255);
	
	return t;
}


function assembleIp()
{
    var ip1Ctrl = document.getElementById('ip1');
    var ip2Ctrl = document.getElementById('ip2');
    var ip3Ctrl = document.getElementById('ip3');
    var ip4Ctrl = document.getElementById('ip4');

	ip = 0;

    ip += (ip1Ctrl.value << 24);
    ip += (ip2Ctrl.value << 16);
    ip += (ip3Ctrl.value << 8);
    ip += (ip4Ctrl.value << 0);
}


function assembleMask()
{
    var mask1Ctrl = document.getElementById('mask1');
    var mask2Ctrl = document.getElementById('mask2');
    var mask3Ctrl = document.getElementById('mask3');
    var mask4Ctrl = document.getElementById('mask4');

    mask = 0;

    mask += (mask1Ctrl.value << 24);
    mask += (mask2Ctrl.value << 16);
    mask += (mask3Ctrl.value << 8);
    mask += (mask4Ctrl.value << 0);
}


function calc()
{	
    var subnetCtrl	= document.getElementById('subnetCount');
    var hostCtrl	= document.getElementById('hostCount');

	assembleIp();
	assembleMask();

	var outputCtrl		= document.getElementById('output');

	var netBitsLabel	= document.getElementById('netBits');
	var subnetBitsLabel	= document.getElementById('subnetBits');
	var hostBitsLabel	= document.getElementById('hostBits');
	var netLabel		= document.getElementById('net');
	var subnetLabel		= document.getElementById('subnet');
	var hostLabel		= document.getElementById('host');

    netBits		= 32 - Math.ceil(Math.log2(~mask));
    subnetBits	= Math.ceil(Math.log2(subnetCtrl.value));
	hostBits	= Math.ceil(Math.log2(hostCtrl.value));
	net			= 1;
	subnet		= Math.pow(2, subnetBits);
	host		= Math.pow(2, hostBits) - 2;

	netBitsLabel.innerText		= netBits;
	subnetBitsLabel.innerText	= subnetBits;
	hostBitsLabel.innerText 	= hostBits;
	netLabel.innerText			= net;
	subnetLabel.innerText		= subnet;
	hostLabel.innerText			= host;

	while (outputCtrl.children.length > 1)
    {
        outputCtrl.removeChild(outputCtrl.children[1]);
    }

	for (var i = 0; i < subnet; i++)
	{
		var row						= document.createElement('tr');

		var networkIpCtrl			= document.createElement('td');
		var maskIpCtrl				= document.createElement('td');
        var firstIpCtrl				= document.createElement('td');
        var lastIpCtrl 				= document.createElement('td');
        var defaultGatewayIpCtrl	= document.createElement('td');
        var broadcastIpCtrl			= document.createElement('td');

		var networkIp			= ip + (i << (32  - netBits - subnetBits));
		var maskIp				= 0xFFFFFFFF ^ (host - 1);
        var firstIp				= networkIp + 1;
        var lastIp				= networkIp + Math.pow(2, hostBits) - 3;
        var defaultGatewayIp	= networkIp + Math.pow(2, hostBits) - 2;
        var broadcastIp			= networkIp + Math.pow(2, hostBits) - 1;

		networkIpCtrl.innerText			= showIp(networkIp);
		maskIpCtrl.innerText			= showIp(maskIp);
		firstIpCtrl.innerText			= showIp(firstIp);
		lastIpCtrl.innerText			= showIp(lastIp);
		defaultGatewayIpCtrl.innerText	= showIp(defaultGatewayIp);
		broadcastIpCtrl.innerText		= showIp(broadcastIp);

        row.appendChild(networkIpCtrl);
		row.appendChild(maskIpCtrl);
        row.appendChild(firstIpCtrl);
        row.appendChild(lastIpCtrl);
        row.appendChild(defaultGatewayIpCtrl);
        row.appendChild(broadcastIpCtrl);

        outputCtrl.appendChild(row);
	}
}
