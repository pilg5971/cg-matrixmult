class Matrix {
    constructor(r, c) {
        this.rows = r;
        this.columns = c;
        this.data = [];
        var i, j;
        for (i = 0; i < this.rows; i++) {
            this.data.push([]);
            for (j = 0; j < this.columns; j++) {
                this.data[i].push(0);
            }
        }
    }

    set values(v) {
        var i, j, idx;
        // v is already a 2d array with dims equal to rows and columns
        if (v instanceof Array && v.length === this.rows && 
            v[0] instanceof Array && v[0].length === this.columns) {
            this.data = v;
        }
        // not valid
        else {
            console.log("could not set values for " + this.rows + "x" + this.columns + " maxtrix");
        }
    }

    get values() {
        return this.data.slice();
    }

    // matrix multiplication (this * rhs)
    mult(rhs)
	{
        var result = null;
        // ensure multiplication is valid
        if (rhs instanceof Matrix && this.columns === rhs.rows)
		{//Matrix multiplcation implementation here...

			//Declaring 'dummyArray' and 'total' for calculation storage
			var dummyArray;
			var total = 0;
            result = new Array();
			
			//1. Create Storage
			//2. Loop through final product size - Outer Loop
			//3. Loop through columns of rhs - Middle Loop
			//4. Loop through abitrary amount of time corresponding to amount of calculations - Inner Loop
			//5. Push data to dummy Arrays
			//6. Update 'result' and push it to 'this'
					
            for (var result_Index = 0; result_Index < this.rows; result_Index ++)
			{
				dummyArray = new Array();
				for (var column_Index = 0; column_Index < rhs.columns; column_Index++)
				{
					for (var count = 0; count < this.columns; count++)
					{
						total += (rhs.data[count][column_Index] * this.data[result_Index][count])
					}//Inner Loop (Inner)
					dummyArray.push(total);
					total = 0;
				}//Middle Loop (Middle)
				result.push(dummyArray);
			}//Base Loop (Outer)
			
			//Updating 'result' and pushing it to 'this' - Live
			this.data = result;
			this.columns = rhs.columns;
            result = this;
        }
		
        else 
		{
            console.log("could not multiply - row/column mismatch");
        }
        return result;
    }
}

Matrix.multiply = function(...args) {
    var i;
    var result = null;
    // ensure at least 2 matrices
    if (args.length >= 2 && args.every((item) => {return item instanceof Matrix;})) {
        result = args[0];
        i = 1;
        while (result !== null && i < args.length) {
            result = result.mult(args[i]);
            i++;
        }
    }
    else {
        console.log("could not multiply - requires at least 2 matrices");
    }
	console.table(result);
    return result;
}
