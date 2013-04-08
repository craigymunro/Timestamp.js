var Timestamp = Class.create({
	
	initialize: function(args)
	{
		this.debug = true;
		this.frequency = 5;
				
		this.update();
	},

	shortDays: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
	days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	shortMonths: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
	months: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
	
	log: function(x)
	{
		if(this.debug)
		{
			console.log(x);
		}
	},
		
	update: function()
	{
		// Re-evaluate timestamps, as some new ones may have
		// been added by AJAX
		this.timestamps = $$("*[data-timestamp]");
		
		for(i = 0; i < this.timestamps.length; i++)
		{
			var stampy = this.timeAgoInWords(
				new Date(
					this.timestamps[i].getAttribute("data-timestamp") * 1000
				)
			);
			
			if(this.timestamps[i].innerHTML != stampy)
			{
				this.timestamps[i].update(stampy);
			}
		}

		window.setTimeout(
			function(thisObj)
			{
				thisObj.update();
			},
			this.frequency * 1000,
			this
		);
	},

    /**
     * Given a formatted string, replace the necessary items and return.
     * Example: Time.now().strftime("%B %d, %Y") => February 11, 2008
     * @param {String} format The formatted string used to format the results
     */
    strftime: function(date, format)
    {
		var day = date.getDay(), month = date.getMonth();
		var hours = date.getHours(), minutes = date.getMinutes();
		
		var pad = function(num)
		{
			var string = num.toString(10);
			return new Array((2 - string.length) + 1).join('0') + string
		};
		
		return format.replace(
			/\%([aAbBcdHImMpSwyY])/g,
			function(part)
			{
				switch(part[1])
				{
					case 'a': return this.shortDays[day]; break;
					case 'A': return this.days[day]; break;
					case 'b': return this.shortMonths[month]; break;
					case 'B': return this.months[month]; break;
					case 'c': return date.toString(); break;
					case 'd': return pad(date.getDate()); break;
					case 'H': return pad(hours); break;
					case 'I': return pad((hours + 12) % 12); break;
					case 'm': return pad(month + 1); break;
					case 'M': return pad(minutes); break;
					case 'p': return hours > 12 ? 'PM' : 'AM'; break;
					case 'S': return pad(date.getSeconds()); break;
					case 'w': return day; break;
					case 'y': return pad(date.getFullYear() % 100); break;
					case 'Y': return date.getFullYear().toString(); break;
				}
			}
		);
    },
  
    timeAgoInWords: function(targetDate, includeTime)
    {
		return this.distanceOfTimeInWords(targetDate, new Date(), includeTime);
    },
  
    /**
     * Return the distance of time in words between two Date's
     * Example: '5 days ago', 'about an hour ago'
     * @param {Date} fromTime The start date to use in the calculation
     * @param {Date} toTime The end date to use in the calculation
     * @param {Boolean} Include the time in the output
     */
    distanceOfTimeInWords: function(fromTime, toTime, includeTime)
    {
		var delta = parseInt((toTime.getTime() - fromTime.getTime()) / 1000);

		if (delta <= 0) {
			return 'just now';
		} else if (delta < 60) {
			return delta + ' seconds ago';
		} else if (delta < 60) {
			return 'less than a minute ago';
		} else if (delta < 120) {
			return 'One minute ago';
		} else if (delta < (45*60)) {
			return (parseInt(delta / 60)).toString() + ' minutes ago';
		} else if (delta < (120*60)) {
			return 'One hour ago';
		} else if (delta < (24*60*60)) {
			return '' + (parseInt(delta / 3600)).toString() + ' hours ago';
		} else if (delta < (48*60*60)) {
			return 'One day ago';
		} else {
			var days = (parseInt(delta / 86400)).toString();
			return days + " days ago"
		}
    }	
});
