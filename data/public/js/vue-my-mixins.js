// Define a new component
if (typeof VueMyMixins === 'undefined') {
    function VueMyMixins() { } // Goes to window.VueMyMixins
}

/**
 * Usage:
 * mixins: [
 *      VueMyMixins.mixin
 * ],
 */

VueMyMixins.mixin = {
    // Same-name data are overwritten
    computed: {
        headers() {
            return {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json'
            }
        },
    },
    data: function () {
    },
    methods: {
        getShortenedNum: function (number) {
            number = _.toNumber(number)
            if (Math.abs(number) > 999999) {
                return Math.abs(number) > 999999 ? Math.sign(number) * ((Math.abs(number) / 1000000).toFixed(2)) + 'M' : Math.sign(number) * Math.abs(number)
            } else {
                return Math.abs(number) > 999 ? Math.sign(number) * ((Math.abs(number) / 1000).toFixed(2)) + 'K' : Math.sign(number) * Math.abs(number)
            }
        },
        formatDate: function (value, format, timeZone = '+0800') {
            if (value === undefined || value === null) {
                return null
            }
            let formatted = moment(value).utcOffset(timeZone).format(format);
            if (formatted === "Invalid date") {
                return null;
            }
            return formatted;
        },
        shortenString: function (value) {
            if (value.length > 100) {
                return value.substring(0, 100) + '...'
            }
            return value
        }
    }
}

