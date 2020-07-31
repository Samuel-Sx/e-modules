<template>
    <div id="drawborad"></div>
</template>

<script>
import Painterro from 'coustom-painterro'

export default {
    name: 'Y-drawBorad',
    props: {
        saveType: {
            type: String,
            default: 'base64'
        },
        backGround: {
            type: String,
            default: undefined
        }
    },
    methods: {
        initDrawBorad() {
            const _this = this
            this.drawBorad = Painterro({
                id: 'drawborad',
                language: 'cn',
                activeColor: '#cccccc',
                defaultTool: 'brush',
                how_to_paste_actions: ['extend_right', 'extend_down'],
                availableLineWidths: [1, 5, 10],
                availableFontSizes: [12, 14, 16, 18, 20, 24, 28, 32, 36],
                hiddenTools: [
                    'crop',
                    'resize',
                    'open',
                    'rotate',
                    'settings',
                    'select',
                    'pixelize'
                ],
                saveHandler: function({ asBlob, asDataURL }, done) {
                    let backImage = null
                    switch (_this.saveType) {
                        case 'blob':
                            backImage = asBlob()
                            break
                        case 'base64':
                            backImage = asDataURL()
                            break
                    }
                    _this.$emit('save', backImage)
                    done()
                },
                onBeforeClose: function(hasUnsavedChange, closeFn) {
                    console.log(hasUnsavedChange, closeFn)
                    _this.$parent.visible = false
                }
            })
        }
    },
    mounted() {
        this.initDrawBorad()
        this.drawBorad.show(this.backGround)
        this.oncontextmenu = window.oncontextmenu
        window.oncontextmenu = function() {
            return false
        }
    },
    beforeDestroy() {
        window.oncontextmenu = this.oncontextmenu
        delete this.oncontextmenu
        this.drawBorad.hide()
        delete this.drawBorad
    }
}
</script>
