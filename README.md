# Dreamy Data Prep

A pure JavaScript function to smartly reduce x/y data points, typically to prep for charting.

This is useful if, for example, your dataset is very large and you want to limit the number of points you render on a chart.

This function has no side effects, is idempotent, and returns the same format as you pass it, meaning you can drop it directly around your dataset object (or compose it with other functions).

## Victory Charts (And Others)

Written particularly for Victory (https://formidable.com/open-source/victory/), but there's nothing specific to that library (or React) and it could easily be adapted to any x/y charting or data tool.

You can use this function in place of the dataset-reducing function in the Victory guide for large datasets (https://formidable.com/open-source/victory/guides/zoom-large-data/). The biggest advantage is that this function will work with line type charts, by preserving points just outside of the zoom range to maintain lines that should extend outside of that range.

## Sponsor: Dreamaker.io

Made on behalf of Dreamaker.io, a super groovy video/audio analysis app you should definitely check out. Thank you to Dreamaker.io for supporting open-sourcing this handy little function!