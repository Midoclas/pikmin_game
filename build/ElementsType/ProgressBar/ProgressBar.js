var ProgressBar = /** @class */ (function () {
    function ProgressBar(query, defaultStoredValue) {
        this.objectElement = document.getElementById(query);
        var storedValue = localStorage.getItem(defaultStoredValue);
        if (storedValue === null) {
            this.timeProgressBar = parseFloat(defaultStoredValue);
        }
        else {
            this.timeProgressBar = parseFloat(storedValue);
        }
    }
    ProgressBar.prototype.setTimeProgressBar = function (timeProgressBar) {
        this.timeProgressBar = timeProgressBar;
        if (this.objectElement !== null) {
            this.objectElement.style.animationDuration = this.timeProgressBar + "s";
        }
        this.repaint();
    };
    ProgressBar.prototype.getTimeProgressBar = function () {
        return this.timeProgressBar;
    };
    ProgressBar.prototype.setProgressBar = function () {
        if (this.objectElement !== null) {
            this.objectElement.style.animationDuration = this.timeProgressBar + "s";
            this.objectElement.style.animationName = "progressBar";
        }
        this.repaint();
    };
    ProgressBar.prototype.repaint = function () {
        // if (this.objectElement !== null) {
        //     this.objectElement.innerHTML = this.timeProgressBar.toString();
        // }
    };
    return ProgressBar;
}());
export default ProgressBar;
