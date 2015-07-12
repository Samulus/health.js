Date.prototype.mdy = function() {
 var yyyy = this.getFullYear().toString();
 var mm = (this.getMonth()+1).toString();
 var dd = this.getDate().toString();
 return (mm[1] ? mm : '0' + mm[0]) + '/' + (dd[1] ? dd : '0' + dd[0]) + '/' + yyyy;
};
