export default {
  timestampToTime: (timestamp) => {
    const date = new Date(timestamp * 1000)
    const Y = date.getFullYear() + '-'
    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    const D = date.getDate() + ' '
    const h = date.getHours() + ':'
    const m = date.getMinutes() + ':'
    const s = date.getSeconds()
    return Y + M + D + h + m + s
  },
  transformTozTreeFormat: function (sNodes) {
    var i, l
    var r = []
    var tmpMap = {}
    for (i = 0, l = sNodes.length; i < l; i++) {
      tmpMap[sNodes[i].id] = sNodes[i]
    }
    for (i = 0, l = sNodes.length; i < l; i++) {
      var p = tmpMap[sNodes[i].pid]
      if (p && sNodes[i].id != sNodes[i].pid) {
        var children = this.nodeChildren(p)
        if (!children) {
          children = this.nodeChildren(p, [])
        }
        children.push(sNodes[i])
      } else {
        r.push(sNodes[i])
      }
    }
    return r
  },
  nodeChildren: function (node, newChildren) {
    if (typeof newChildren !== 'undefined') {
      node.children = newChildren
    }
    return node.children
  }
}
