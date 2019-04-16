var Food = React.createClass({
    getInitialState: function(){  //estados Like 
        return { 
            like: Boolean(this.props.like),
            editing: false,//editar elementos
        }
    },
    handleLike: function(){
        this.setState({like: !this.state.like})
    },
    edit: function(){
        this.setState({editing: true})
    },
    save: function(){
        this.props.onChange(this.refs.newName.value, this.props.index);
        this.setState({editing: false});
    },
    remove: function(){
        this.props.onRemove(this.props.index);
    },
    cancel: function(){
        this.setState({editing: false})
    },
    showEditingView: function(){
        return (
            <div className="comida">
                <input ref="newName" type="text" className="form-control" placeholder="New name" defaultValue={this.props.nombre} />
                <div className="glyphicon glyphicon-remove-circle red" onClick={this.cancel}></div>
                <div className="glyphicon glyphicon-ok-circle blue" onClick={this.save}></div>

            </div>
            )
    },
    showFinalView: function(){  
          return (
            <div className="comida">
                <h3 className="bg-success">{this.props.nombre}</h3>
                <p className="bg-info">
                    Position: <i>{this.props.children}</i>
                </p>
                <div>
                    <input type="checkbox" className="glyphicon glyphicon-heart heart" 
                    onChange={this.handleLike} 
                    defaultChecked={this.state.like}/>
                    <br />
                    Like: <b>{String(this.state.like)}</b>
                </div>
                <div className="glyphicon glyphicon-trash red" onClick={this.remove}></div>
                <div className="glyphicon glyphicon-pencil" onClick={this.edit}></div>
            </div>
            )
    },
    render: function() {
        if(this.state.editing){
            return this.showEditingView();
        }else{
            return this.showFinalView();
        }
    }
});




var FoodList = React.createClass({
    getInitialState: function() {
        return {
            foodArray: [
                'Tacos',
                'Paella',
                'Pizza'
            ]
        };
    },
    //forma para agregar propiedades que van a ser por defecto para cada componente
    getDefaultProps: function(){
        return{ //llaves porque devolvemos objeto
            //propiedades por defecto
            framework: "React",
            tech: "JavaScript"
        }
    },
    //lo que necesito antes de cargar la aplicacion
    componentWillMount: function(){
        var country;
        var self = this;
        $.getJSON("https://restcountries.eu/rest/v1/all", function(data){
            for(country in data){
                console.log(country, data[country].name);
                self.add(data[country].name);
            }
            $(this.refs.spinner).removeClass("glyphicon-refresh-animate");
        });
    },
    //aniadir elemento al array
    add: function(food){
       var newFoodVar = this.refs.newFood.value;
       if(newFoodVar == ""){
            if(typeof food == 'undefined'){
                newFoodVar = "New dish"
            }else{
                newFoodVar = food;
            }
       }
        var arrAux = this.state.foodArray;
        arrAux.push(newFoodVar);
        this.setState({foodArray: arrAux}) 
        this.refs.newFood.value = ""
    },
    //tecla Intro
    handleKeyDown: function(e){
        if(e.charCode === 13){
            this.add();
        }
    },
    //eliminar instancias
    remove: function(i){
        var arrAux = this.state.foodArray;
        arrAux.splice(i,1);
        this.setState({foodArray: arrAux});
    },
    //actualizacion instancias
    remove: function(i){
        var arrAux = this.state.foodArray;
        arrAux.splice(i,1);
        this.setState({foodArray: arrAux});
    },
    update: function(newName, i){
        var arrAux = this.state.foodArray;
        arrAux[i] = newName;
        this.setState({foodArray: arrAux});
    },
    eachItem: function(food, i) {
        return (
                <Food key={i}
                    index={i}
                    nombre={food}
                    onRemove={this.remove}
                    onChange={this.update}>
                    {i+1}
                </Food>     
            );
    },
    render: function() {
        return(<div className="centerBlock">
                <header>
                    <h1>My favourite food</h1>
                    <i>Total: {this.state.foodArray.length}</i>
                    <br />
                    <span ref="spinner" className="glyphicon glyphicon-refresh"></span>
                    <br />
                    <i>Made with {this.props.framework}, {this.props.tech} library</i>
                </header>
                <div className="input-group">
                    <input ref="newFood" type="text" onKeyPress={this.handleKeyDown} className="form-control" placeholder="Add food" />
                    <span className="input-group-btn">
                    <div className="btn btn-default btn-success" onClick={this.add.bind(null, "New dish")}> + </div>
                    </span>
                </div>
                
                <div>
                    {this.state.foodArray.map(this.eachItem)}
                </div>
            </div>)
    }
});


ReactDOM.render(<FoodList/>, document.getElementById('container')
);