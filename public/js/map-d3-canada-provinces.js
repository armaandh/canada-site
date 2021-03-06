function resize() {
  width = parseInt(d3.select("#viz").style("width")), width = width - margin.left - margin.right, height = width * mapRatio, projection.translate([width / 2, height / 2]).center(canada_center).scale(width * [mapRatio + mapRatioAdjuster]), svg.style("width", width + "px").style("height", height + "px"), svg.selectAll("path").attr("d", path)
}

function zoomed() {
  features.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")")
}
var margin = {
    top: 10,
    left: 10,
    bottom: 10,
    right: 10
  },
  width = parseInt(d3.select("#viz").style("width")),
  width = width - margin.left - margin.right,
  mapRatio = .5,
  height = width * mapRatio,
  mapRatioAdjuster = .15;
center = [5, 20];
var projection = d3.geo.azimuthalEqualArea().rotate([100, -45]).center(center).translate([width / 2, height / 2]).scale(width * [mapRatio + mapRatioAdjuster]),
  zoom = d3.behavior.zoom().translate([0, 0]).scale(1).scaleExtent([1, 10]).on("zoom", zoomed);
d3.select(window).on("resize", resize);
var svg = d3.select("#viz").append("svg").attr("width", width).attr("height", height).call(zoom),
  path = d3.geo.path().projection(projection),
  features = svg.append("g");
d3.json("https://armaandh.github.io/canada-site/public/assets/js/json/canada-topojson.json", function (t, e) {
  if (t) return console.error(t);
  topojson.feature(e, e.objects.canada);
  features.selectAll("path").data(topojson.feature(e, e.objects.canada).features).enter().append("path").attr("d", path).attr("fill", "#e8d8c3").attr("stroke", "#404040").attr("stroke-width", .45).on("mousemove", function (t) {
    d3.select("#tooltip").style("top", d3.event.pageY + 20 + "px").style("left", d3.event.pageX + 20 + "px").select("#province-name-tooltip").text(t.properties.NAME), d3.select("#province-name").text(t.properties.NAME), d3.select("#tooltip").classed("hidden", !1)
  }).on("mouseout", function () {
    d3.select("#tooltip").classed("hidden", !0)
  })
});