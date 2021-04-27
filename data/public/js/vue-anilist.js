// Define a new component
if (typeof VueAnilist === 'undefined') {
    function VueAnilist() { } // Goes to window.VueAnilist
}

/**
 * Usage:
 * mixins: [
 *      VueAnilist.mixin
 * ],
 */

VueAnilist.mixin = {
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
        onSelect: function (o) {
            this.s = o.display
        },
        getSource: function (input) {
            return 'https://kitsu.io/api/edge/anime?filter[text]=' + input
        },
        formattedDisplay: function (items) {
            let data = items.data

            _.map(data, (list) => {
                list.name = list.attributes.canonicalTitle
                return list
            })

            return data
        }
    }
}

