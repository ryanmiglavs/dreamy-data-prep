/**
 * Prep data for use by removing points and returning the reduced set.
 * This function has no side effects, and returns a reduced data array in the same format as passed.
 * 
 * @param {Array} data The array of points to prep. Each point is an object with an x and a y property. Format: [{x:val, y:val}]
 * @param {Array} xDomain The x range to target (i.e. the zoom range of the chart). Format: [minX, maxX]
 * @param {Number} maxPoints The target number of points you'd like in the data. No more than this number of points will be returned.
 * 
 * @return {Array} Returns an array of the same format as the data param. [{x:val ,y:val}]
 */
export function prepData(data, xDomain, maxPoints=100) {

	// Stop if it's already a small dataset
	if (data.length < maxPoints) {
		return data;
	}

	// Find the closest x values just outside of range, so we can trim
	// while retaining lines that extend beyond the range. This lets
	// lines that extend beyond the range still display.

	const xValues = data.map(coord => coord.x);

	const xLeftOfRange = xValues.reduce( (prev, curr) => { // NOTE: array.prototype.reduce() begins with prev=array[0] and curr=array[1]
		const currDiff = curr - xDomain[0];       // Find the distance of the CURRENT point from the left (min) of the range
		const prevDiff = Math.abs(prev - xDomain[0]); // Find the distance of the PREVIOUS CLOSEST point from the left of the range
		return (currDiff < prevDiff) && (currDiff < 0) ? curr : prev; // Keep whichever is CLOSER and also LEFT of the range (i.e. the difference is negative)
	});
	const xRightOfRange = xValues.reduce( (curr, prev) => { // NOTE: array.prototype.reduce() begins with prev=array[0] and curr=array[1]
		const currDiff = curr - xDomain[1];       // Find the distance of the CURRENT point from the right (max) of the range
		const prevDiff = Math.abs(prev - xDomain[1]); // Find the distance of the PREVIOUS CLOSEST point from the right of the range
		return (currDiff < prevDiff) && (currDiff > 0) ? curr : prev; // Keep whichever is CLOSER and also RIGHT of the range (i.e. the difference is positive)
	});

	// Strip points outside of the range
	const filtered = data.filter(
		(d) => {
			return (d.x >= xLeftOfRange) && (d.x <= xRightOfRange);
		}
	);

	// Reduce number of visible points to maxPoints by only keeping
	// multiples of the filtered list length divided by maxPoints,
	// while also retaining the first and last point (the points just
	// outside of the domain).
	if (filtered.length > maxPoints) {
		const k = Math.ceil(filtered.length / maxPoints);
		return filtered.filter(
			(d, i, a) => {
				return (
					((i % k) === 0) ||     // Is the point a multiple of k?
					(i === 0) ||           // Is it the first point?
					(i === (a.length-1))   // Is it the last point?
				);
			}
		);
	}
	
	return filtered;

}