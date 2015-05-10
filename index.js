module.exports = _Class

var haspro = {}.hasOwnProperty
var _list_s = [].splice

function _Class(c, p) {

    //save org_initialize
    //c._org_initialize = c.initialize
    if (c.initialize === undefined) {
        c['initialize'] = function() {}
    };

    //add super
    /*
    c.initialize = function _init() {
	this.super = Object.prototype
	if (c._org_initialize){
	    c._org_initialize()
	};
    };
    */
    c.initialize.__super__ = Object

    //hanlde with parent
    if (p) {
	/*
	//add super 
        c.initialize = function _init() {
	    this.super = p.prototype
	    if (c._org_initialize){
	        c._org_initialize()
	    };
        };
	*/
        c.initialize.__super__ = p
	//Inheritance
        c.initialize.prototype = Object.create(p.prototype);
	c.initialize.prototype.constructor = c.initialize;
	function _super() {
	    var current_class = c.initialize;
	    function __super() {
		//p.prototype[arguments[0]].apply(this, _list_s.call(arguments, 1, -1))
		var bak = current_class;
		current_class = current_class.__super__;
	        result = current_class.prototype[arguments[0]].apply(this, _list_s.call(arguments, 1, arguments.length))
		current_class = bak
		return result
	    };
	    return __super
	};
	c.initialize.prototype.super = _super();

    };

    //class method
    for (k in c) {
        if (haspro.call(c,k) && k != 'initialize'){
            c.initialize.prototype[k] = c[k];
        };
    };

    return c.initialize;
};

