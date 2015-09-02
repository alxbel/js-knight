function board() {
	this.rows           = 8;
	this.columns        = 8;
    this.currentRow     = 0;
    this.currentColumn  = 0;
    var horizontal     = [ 2,  1, -1, -2, -2, -1, 1, 2 ];
    var vertical       = [-1, -2, -2, -1,  1,  2, 2, 1 ];

    this.create = function() {
        for (var row = 1; row <= this.rows; row++) {
            var evenRow = (row % 2) == 0;
            var tr = document.createElement('tr');
            var id = row;
            tr.id = id;
            document.querySelector('.chessboard').appendChild(tr);
            for (var column = 1; column <= this.columns; column++) {
                var evenColumn = (column % 2) == 0;
                var td = document.createElement('td');
                var id = row + "." + column;
                td.id = id;
                document.getElementById(tr.id).appendChild(td);
                if (!evenRow && !evenColumn) {
                    document.getElementById(td.id).className = "white";
                } else if (!evenRow && evenColumn) {
                    document.getElementById(td.id).className = "green";
                } else if (evenRow && evenColumn) {
                    document.getElementById(td.id).className = "white";
                } else if (evenRow && !evenColumn) {
                    document.getElementById(td.id).className = "green";
                }
                document.getElementById(td.id).className += " free";
            }
        }
        document.querySelector('body').addEventListener('click', this.addCellListeners);
    }

    this.initKnight = function() {
        var row = Math.floor((Math.random() * 8) + 1);
        var column = Math.floor((Math.random() * 8) + 1);
        moveKnight(row, column);
        markFreeCells();
    }

    this.addCellListeners = function(event) {
        if (event.target.tagName.toLowerCase() === 'td') {
            var id = event.target.id;
            var row = id.substring(0, 1);
            var column = id.substring(2);
            moveKnight(row, column);
            markFreeCells();
        }
    }

    function moveKnight(row, column) {
        var id = row + "." + column;
        var el = document.getElementById(id);
        var old = document.getElementById("knight");

        if ((el.className.indexOf("marked") == 1) || (el.className.indexOf("free") == -1)) {
            console.log('U cant.');
            return;
        }

        // Remove knight icon from old position
        if (old !== null) {
            old.parentNode.removeChild(old);
        }

        // Move knight icon to the new position
        el.innerHTML = "<div id=\"knight\"></div>"
        this.currentRow = row;
        this.currentColumn = column;
        // Add 'marked' tag for our new position
        el.className += " marked";

        // Now remove all 'free' tags because we've changed our position
        var tds = document.getElementsByTagName("td");
        for (var i = 0; i < tds.length; i++) {
            tds[i].className = tds[i].className.replace("free", "");
        }
    }

    function markFreeCells() {
        for (var cell = 0; cell < horizontal.length; cell++) {
            var row = parseInt(this.currentRow) + vertical[cell];
            var column = parseInt(this.currentColumn) + horizontal[cell];
            var id = row + "." + column;
            var el = document.getElementById(id);
            if (el !== null && el.className.indexOf("marked") == -1) {
                el.className += " free";
            }
        }
        if (document.getElementsByClassName("free").length == 0) {
            document.querySelector('body').removeEventListener('click', this.addCellListeners);
            alert("You lose! Hit F5 and try again.");
        }
    }
}