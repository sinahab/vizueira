class Tree extends Array {
	constructor(branchCount, depth){
		super()
		this._branchCount = branchCount;
		this._depth = depth;
		this._level = 0;
		this._node = 0;
	}
	get maxNodes(){
		return this.nodesAtFloored( this._depth + 1 ) / this.adjCount;
	}
	get adjCount(){
		return this._branchCount - 1
	}
	get firstChildNode(){
		return this._node * this._branchCount
	}
	get firstChildIndex(){
		return this.locate( this._level + 1, this.firstChildNode )
	}
	get lastChildNode(){
		return this._node * this._branchCount + this.adjCount;
	}	
	get lastChildIndex(){
		return this.locate( this._level + 1, this.lastChildNode )
	}	
	set node( value ){
		let level=this._level, 
				node=this._node,
				index = this.locate( level, node );
				this.deepen(index + 1)
		this[this.locate( level, node ) ] = value
	}	
	get node(){

		let level=this._level, 
				node=this._node,
				index = this.locate( level, node );
				this.deepen(index + 1)
		return this[ this.locate( level, node ) ]
	}

	get root(){
		this._level = 0;
		this._node = 0;
		return this.node
	}
	set root( value ){
		this._level = 0;
		this._node = 0;
		this.node = value;
		return this.node
	}
	get parent(){
		this.toParent()
		return this.node
	}
	set parent( arg ){
		this.toParent()
		this.node = arg;
	}
	get children(){
		this.deepen( this.lastChildIndex + 1 )
		let children = this.slice( this.firstChildIndex, this.lastChildIndex + 1 );
				return children
	}
	set children( vals ){
		this.deepen( this.lastChildIndex + 1 )	
		vals.map(function( item, index ){
			this[this.firstChildIndex+index] = item
		}, this)
		return this.children
	}	
	deepen( index ){
		if(this.length < index ){
			this.length = index;
		}		
	}
	nodesAt( level= this._level ){
		return Math.pow( this._branchCount, level )
	}
	nodesAtFloored( level= this._level ){
		return this.nodesAt( level ) - 1 
	}	
	rootNodeAt( level=this._level ){
		return this.nodesAtFoored( level ) / this.adjCount
	}
	locate( level, node ){
		return node + this.nodesAtFloored( level ) / this.adjCount 
	}
	toFirst(){
		this._level ++;
		this._node = this.firstChildNode;
	}	
	toLast(){
		this._level ++;
		this._node = this.lastChildNode; 
	}
	toParent(){
		this._level --;
		this._node = Math.floor( this._node / this._branchCount );
	}
	goTo( node=this._node, level=this._level ){
		this._level = level;
		this._node = node;
		return this.node
	}

}
module.exports = Tree