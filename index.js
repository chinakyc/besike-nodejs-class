module.exports = _Class

var haspro = {}.hasOwnProperty
var _list_s = [].splice

function _Class(c, p) {

    if (c.initialize === undefined) {
        c['initialize'] = function() {}
    };

    c.initialize.__super__ = Object

    //hanlde with parent
    if (p) {

        c.initialize.__super__ = p
	//Inheritance
        c.initialize.prototype = Object.create(p.prototype);
	c.initialize.prototype.constructor = c.initialize;
	function _super() {
	    var current_class = c.initialize;
	    function __super() {
		//result = p.prototype[arguments[0]].apply(this, _list_s.call(arguments, 1, -1))
		
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

