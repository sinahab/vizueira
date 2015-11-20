class Spore extends Array {
	constructor(parentNode) {
		super()
		this.parent = parentNode
		this.r = this.parent.r
		this.x = this.parent.x
		this.y = this.parent.y
	}
	explode(){
		return new Spore(this)
	}
}

module.exports = Spore