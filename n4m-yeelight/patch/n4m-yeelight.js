const Max = require('max-api')

/** Require the `Bulb` type from the yeelight package */
const { Bulb } = require('yeelight.io') 

let bulb = null

/**
 * Respond to the `connect` message from Max
 */
Max.addHandler('connect', (ip) => {
	/** If bulb hasn'e been instantiated */
	if (!bulb) {

		bulb = new Bulb(ip)

		/** Attach listener to the `connected` event */
		bulb.on('connected', (light) => {
			Max.post(`Connected to bulb @${light.ip}`)
		})

		/** Attach listener to the `disconnected` event */
		bulb.on('disconnected', (light) => {
			Max.post(`Disconnected from bulb @${light.ip}`)
		})

		/** Attach listener to the `error` event */
		bulb.on('error', (light, err) => {
			Max.post(`Error "${err.message}" from bulb @${light.ip}`)
		})

		/** Instantiate bulb */
		bulb.connect()
	}
})

/**
 * Respond to the `disconnect` message from Max
 */
Max.addHandler('disconnect', () => {
	/** If there is a bulb */
	if (bulb) {
		bulb.disconnect()
		bulb = null
	}
})

/**
 * Respond to the `on` message from Max
 */
Max.addHandler('on', () => {
	if (bulb) {
		bulb.onn()
	}
})

/**
 * Respond to the `off` message from Max
 */
Max.addHandler('off', () => {
	if (bulb) {
		bulb.off()
	}
})

/**
 * Respond to the `toggle` message from Max
 */
Max.addHandler('toggle', () => {
	if (bulb) {
		bulb.toggle()
	}
})

/**
 * Respond to the `brightness` message from Max
 */
Max.addHandler('brightness', (value) => {
	if (bulb) {
		bulb.brightness(value)
	}
})

/**
 * Respond to the `color` message from Max
 */
Max.addHandler('color', (r, g, b) => {
	if (bulb) {
		bulb.color(r, g, b)
	}
})