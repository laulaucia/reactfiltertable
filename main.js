// /////////////////// //
// Resource page logic //
// /////////////////// //

// renders individual resource nodes on the right side of the page
var ResourceNode = React.createClass({
	render: function(){
		// make tags for each resource into materialize chips 
		var tags = [];
		for (var i=0; i < this.props.resource.tags.length; i++){
			tags.push(<div className="chip" key={i} >{this.props.resource.tags[i]}</div>);
		}
		return (
			<div className="purple lighten-4 ">
				<h5 className="titles">{this.props.resource.title}</h5>
				<div className="tags">{tags}</div>
			</div>
			);
	}
});


// renders table that contains the resources
// this is where the resources get filtered
var ResourceResultTable = React.createClass({
	// gets filters set to true from state data
	getfilters: function(){
		var props = this.props;
		var filters = props.filters;
		var trueFilters = []
		for (var i=0; i <filters.length; i++){
				if(filters[i].checked === true){
					trueFilters.push(filters[i].title);
					} 
				}
			return trueFilters;	
	},
	render: function(resource){
		var props = this.props;
		var findTrueFilters = this.getfilters();
		console.log(findTrueFilters)
		var resourceRows = this.props.resources
		.filter(function(resource){
			return (resource.title.toLowerCase().indexOf(props.filterText.toLowerCase()) > -1)
		})
		.filter(function(resource){
			var toggle = false;
			if(findTrueFilters.length == 0){
				return true;
			}
			else{
			$.each(resource.tags , function( key, value ) {
				if($.inArray(value , findTrueFilters) > -1){
					toggle = true;
					return true;
				}
			});
			return toggle;
		}
		})
		.map(function(resource){
			return <ResourceNode key={resource.xid} resource={resource} />;
		});
		return (
		<div className="resourceBlock">
			<div>
				{resourceRows}
			</div>
		</div>
		)
	}
});



var SearchBar = React.createClass({
	handleChange: function(){
		this.props.onSearchInput(
			this.refs.filterTextInput.value
		);
	},
	render: function(){
		return(
		<div className="row">
			<input 
				ref="filterTextInput" 
				value={this.props.filterText} 
				onChange={this.handleChange} 
				type="search" 
				placeholder="Search through these things" 
				className="validate"/>
		</div>
		);
	}
});
	

var Filter = React.createClass({

	handleInputClick: function(){
		console.log("Input Click");
	},
	handleLabelClick: function(e){
		var key = e.target.getAttribute('data-key');
		this.props.onFilterChange(
			key
		);
	},

	render: function(){
		return(	

		<div>
	      	<input 
	      		type="checkbox"
	      		ref={this.props.filter.xid} 
	      		data-key={this.props.arrayKey}
	      		id={this.props.filter.xid} 
	      		checked={this.props.filter.checked}
	      		className="filled-in filterbox" 
	      		value="myVal" 
	      		onChange={this.handleInputClick} />
	      	<label data-key={this.props.arrayKey} onClick={this.handleLabelClick} for={this.props.filter.xid}>{this.props.filter.title}</label>
    	</div>
    	);
	}
});



var FiltersTable = React.createClass({
	handleFilterChange: function(id){
		this.props.onFilterInput(
			id
		);
	},
	render: function(filter){
		// console.log("these are props from the filters table");
		// console.log(this.props);
		var hfc = this.handleFilterChange;
		var filterprops = this.props;
		var count=-1;
		var filters = this.props.filters
		.map(function(filter){
			count++;
			return(<Filter arrayKey={count} key={filter.xid} onFilterChange={hfc} filter={filter} filters={filters} filterprops={filterprops}/>);
		})
		return (
		<div>
			<h4>Filters</h4>
			<div className="filters">{filters} </div>
		</div>
		)
	}
});



var SearchTable = React.createClass({
	getInitialState: function(){
		return {
			filterText: '',
			filters: this.props.filters
		}
	},
	handleSearchInput: function(filterText){
		this.setState({
			filterText: filterText
		});
	},
	handleFilterInput: function(id, filters=this.state.filters){
		console.log(id);
		console.log(filters[id].checked);
		filters[id].checked = !filters[id].checked;
		this.setState({
			filters: filters
		});
	},
	render: function(){
		return(
			<div className="container">
				<h2 className="center" >Filter this!</h2>
				<div className="row">
					<div className="col m6 s12" >
						<form id="filterform">
							<SearchBar onSearchInput={this.handleSearchInput} filterText={this.state.filterText}/>
							<FiltersTable onFilterInput={this.handleFilterInput} filters={this.state.filters} />
						</form>
					</div>
					<div className="col m6 s12">
					<ResourceResultTable resources={this.props.resources} filters={this.state.filters} filterText={this.state.filterText}/>
					</div>
				</div>	
			</div>
		)
	}
})

			//////////////////////////////////
			// Data response from fake API ///
			//////////////////////////////////

var response = {
	resources:[{
			title: "Apple",
			xid: "x37653476",
			tags: ["Free", "Snacks", "Cheetos"]
		},{
			title: "Baker",
			xid: "x364",
			tags: ["Free", "Snacks", "Cheetos"]
		},{
			title: "Cat",
			xid: "x3487345",
			tags: ["Blog", "Snacks", "Cheetos"]
		},{
			title: "Dandelion",
			xid: "x37653471",
			tags: ["Blog", "Snacks", "Awesome"]
		},{
			title: "Elephant",
			xid: "x3642",
			tags: ["Cool Beans", "Snacks", "Cheetos"]
		},{
			title: "Flotsam",
			xid: "x34873453",
			tags: ["Cool Beans", "Snacks", "Awesome"]
		},{
			title: "Gerbil",
			xid: "x376534764",
			tags: ["Blog", "Snacks", "All of the things"]
		},{
			title: "Howistzer",
			xid: "x3645",
			tags: ["Video", "Snacks", "All of the things"]
		},{
			title: "Inky",
			xid: "x34873456",
			tags: ["Blog", "All of the things", "Cheetos"]
		},{
			title: "Juice",
			xid: "x376534767",
			tags: ["Video", "All of the things", "Cheetos"]
		},{
			title: "Kangaroo",
			xid: "x3648",
			tags: ["Blog", "Snacks", "Danger"]
		},{
			title: "shdgjhsdgfjsdhfgsdkjhgfsdjhfgsdkjh",
			xid: "x34873459",
			tags: ["Blog", "Snacks", "Danger"]
		}],
	filters: [{
			title: "All of the things",
			type: "topics",
			xid: 1,
			checked:false
		},{
			title: "Snacks",
			type: "topics",
			xid: 2,
			checked: false
		},{
			title: "Danger",
			type: "topics",
			xid: 3,
			checked: false
		},{
			title: "Cheetos",
			type: "topics",
			xid: 4,
			checked: false
		},{
			title: "Free",
			type: "Resouce Type",
			xid: 5,
			checked: false
		},{
			title: "Awesome",
			type: "Resouce Type",
			xid: 6,
			checked: false
		},{
			title: "Cool Beans",
			type: "Resouce Type",
			xid: 7,
			checked: false
		},{
			title: "Video",
			type: "Resouce Type",
			xid: 8,
			checked: false
		}
		]
};


// render in react!
ReactDOM.render(<SearchTable resources={response.resources} filters={response.filters}/> , document.getElementById('content'));

