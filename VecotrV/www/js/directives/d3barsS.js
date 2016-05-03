
angular.module('app.directives')


  .directive('d3Barsfors', ['$window', '$timeout', 'd3Service',
    function ($window, $timeout, d3Service) {
      return {
        restrict: 'A',
        scope: {
          data: '=',
          label: '@',
          onClick: '&',
          resultData: '=resultEdata'
        },
        link: function (scope, ele, attrs) {
          d3Service.d3().then(function (d3) {

            var renderTimeout;
            var results = scope.resultData;

            var margin = parseInt(attrs.margin) || 20,
              barHeight = parseInt(attrs.barHeight) || 20,
              barPadding = parseInt(attrs.barPadding) || 5;

            var svg = d3.select(ele[0])
              .append('svg')
              .style('width', '100%')
              .style('position', 'absolute');

            $window.onresize = function () {
              scope.$apply();
            };

            A = [1, 1.17, 1.34, 1.49, 1.63, 1.78, 1.93, 2.08];
            B = [1.21, 1.38, 1.55, 1.70, 1.84, 1.99, 2.14, 2.29];
            C = [0.91, 1.08, 1.25, 1.40, 1.54, 1.69, 1.84, 1.99];
            D = [0.47, 0.64, 0.81, 0.96, 1.10, 1.25, 1.4, 1.55];
            //scope.data = [1.78, 1.70, 1.40, 1.25 ];
            scope.data = [
              { x: 3, y: 2.08 },
              { x: 6, y: 2.29 },
              { x: 12, y: 1.99 },
              { x: 18, y: 1.55 }
            ];

            basePoints = [
              { x: 6, y: 0.91, l: "B" },
              { x: 12, y: 0.61, l: "C" }
            ];
            scope.d1 = [
              { x: 3, y: 1.80 },
              { x: 6, y: 2.10 },
              { x: 12, y: 1.78 },
              { x: 15, y: 1.34 }
            ];
            scope.d2 = [
              { x: 3, y: 1.78 },
              { x: 6, y: 1.99 },
              { x: 12, y: 1.69 },
              { x: 15, y: 1.45 }
            ];
            scope.d3 = [
              { x: 3, y: 1.63 },
              { x: 6, y: 1.84 },
              { x: 12, y: 1.54 },
              { x: 15, y: 1.3 }
            ];
            scope.d4 = [
              { x: 3, y: 1.36 },
              { x: 6, y: 1.58 },
              { x: 12, y: 1.25 },
              { x: 15, y: .81 }
            ];

            scope.$watch(function () {
              return angular.element($window)[0].innerWidth;
            }, function () {
              scope.render(scope.data);
            });

            scope.$watch('resultData', function (newData) {
              scope.render(newData);
            }, true);

            scope.render = function (data) {
              svg.selectAll('*').remove();

              if (!data) return;
              if (renderTimeout) clearTimeout(renderTimeout);

              renderTimeout = $timeout(function () {

                var m = [450, 80, 180, 180]; // margins
                var w = d3.select(ele[0])[0][0].offsetWidth - m[0]; // width
                //var h = d3.select(ele[0])[0][0].offsetHeight - m[0]; // height

                var h = 750;
                var line = d3.svg.line()
                  .x(function (d) { return x(d.x); })
                  .y(function (d) { return y(d.y); });

                var width = d3.select(ele[0])[0][0].offsetWidth - margin,
                  height = scope.data.length * (barHeight + barPadding),
                  color = d3.scale.category20();
                var x = d3.scale.log()
                  .domain([5, 15])
                  .range([0, w]),
                  xScale = d3.scale.linear()
                    .domain([0, d3.max(data, function (d) {
                      return d.score;
                    })])
                    .range([0, w]);
                ticks = xScale.ticks();

                ticks.push(6);
                ticks.push(12);


                var y = d3.scale.linear().domain([0, 2.5]).range([h, 0]);
                var yAxisLeft = d3.svg.axis().scale(y).ticks(3).orient("left");
                var xAxis = d3.svg.axis()
                  .scale(x)
                  .orient("bottom")
                  .ticks(10, ",.2s")
                  .tickValues(ticks);




                scope.Areadata = [
                  { x: 4, y: 2.08 },
                  { x: 6, y: 2.29 },
                  { x: 12, y: 1.78 },
                  { x: 16, y: 1.79 },
                ];
                var area = d3.svg.area()
                  .x(function (d) { return x(d.x); })
                  .y0(h)
                  .y1(function (d) { return y(d.y); });




                svg.append('path')
                  .style("stroke", "#A9E2F3")

                  .style("stroke-width", "1")
                  .style("fill", "#A9E2F3")
                  .style('opacity', 0.2)
                  .attr("stroke-width", 0)
                  .attr('d', area(scope.d1));

                // svg.append('path')

                //   .style("fill", "#58D3F7")
                //   .style('opacity', 0.2)
                //   .attr("stroke-width", 0)
                //   .attr('d', area(scope.d2));

                // svg.append('path')
                //   .style("fill", "#A9BCF5")
                //   .style('opacity', 0.2)
                //   .attr("stroke-width", 0)
                //   .attr('d', area(scope.d3));

                svg.append('path')
                  .style("fill", "white")
                  .style('opacity', 1)
                  .attr("stroke-width", 0)
                  .attr('d', area(scope.d4));

                var graph = svg
                  .attr("width", w + m[1] + m[3])
                  .attr("height", h + m[0] + m[2])
                  .append('g')
                  .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

                svg.selectAll(".basesC")
                  .data(basePoints)
                  .enter().append("circle")
                  .attr("class", "basesC")
                  .attr("r", 10)
                  .attr('cx', function (d) { return x(d.x) + 4; })
                  .attr("cy", function (d) { return y(d.y) - 4; })
                  .style("stroke", "black")
                  .style("fill", "none");

                svg.selectAll(".bases")
                  .data(basePoints)
                  .enter().append("text")
                  .attr("class", "bases")
                  .attr('x', function (d) { return x(d.x); })
                  .attr("y", function (d) { return y(d.y); })
                  .text(function (d) { return d.l });





                svg.append('line')
                  .attr("y1", y(0))
                  .attr("y2", y(2.4))
                  .attr("x1", x(6))
                  .attr("x2", x(6))
                  .attr("stroke", "steelblue")
                  .attr("stroke-width", "1");

                svg.append('line')
                  .attr("y1", y(0))
                  .attr("y2", y(2.4))
                  .attr("x1", x(12))
                  .attr("x2", x(12))
                  .attr("stroke", "steelblue")
                  .attr("stroke-width", "1");



                svg.append("rect")
                  .attr("x", 0)
                  .attr("y", 0)
                  .attr("height", h + 30)
                  .attr("width", w + 20)
                  .style("stroke", "black")
                  .style("fill", "none")
                  .style("stroke-width", "4");



                svg.append('g')
                  .attr("class", "x axis")
                  .attr("transform", "translate(10,820)")
                  .style("stroke", "black")
                  .style("fill", "none")
                  .style("stroke-width", "1")
                  .call(xAxis);

                svg.selectAll(".dodoB")
                  .data(B)
                  .enter().append("text")
                  .attr("class", "dodoB")
                  .attr('x', function (d, i) { return x(6); })
                  .attr("y", function (d) { return y(d); })
                  .attr("dx", ".71em")
                  .attr("dy", ".35em")
                  .text(function (d, i) { return i + 1 });



                svg.selectAll(".dodoC")
                  .data(C)
                  .enter().append("text")
                  .attr("class", "dodoC")
                  .attr('x', function (d, i) { return x(12); })
                  .attr("y", function (d) { return y(d); })
                  .attr("dx", ".71em")
                  .attr("dy", ".35em")
                  .text(function (d, i) { return i + 1 });


                svg.append('path')
                  .style("stroke", "blue")
                  .style("fill", "none")
                  .style("stroke-width", "4")
                  .attr('d', line(results.L));

                svg.selectAll(".path")
                  .data(results.L)
                  .enter().append("path")
                  .attr("transform", function (d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; })
                  .attr("d", d3.svg.symbol().type("cross"));

                svg.append('path')
                  .style("stroke", "blue")
                  .style("stroke-dasharray", ("3, 7"))
                  .style("fill", "none")
                  .style("stroke-width", "4")
                  .attr('d', line(results.LG));

                svg.selectAll(".path")
                  .data(results.LG)
                  .enter().append("path")
                  .attr("transform", function (d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; })
                  .attr("d", d3.svg.symbol().type("cross"));

                svg.append('path')
                  .style("stroke", "black")

                  .style("fill", "none")
                  .style("stroke-width", "4")
                  .attr('d', line(results.R));

                svg.selectAll(".path")
                  .data(results.R)
                  .enter().append("path")
                  .attr("transform", function (d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; })
                  .attr("d", d3.svg.symbol().type("triangle-down"));

                svg.append('path')
                  .style("stroke", "black")
                  .style("stroke-dasharray", ("3, 7"))
                  .style("fill", "none")
                  .style("stroke-width", "4")
                  .attr('d', line(results.RG));

                svg.selectAll(".path")
                  .data(results.RG)
                  .enter().append("path")
                  .attr("transform", function (d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; })
                  .attr("d", d3.svg.symbol().type("triangle-down"));

              }, 200);
            };
          });
        }
      }
    }])
  .directive('d3Barsforsglare', ['$window', '$timeout', 'd3Service',
    function ($window, $timeout, d3Service) {
      return {
        restrict: 'A',
        scope: {
          data: '=',
          label: '@',
          onClick: '&',
          resultData: '=resultEdata'
        },
        link: function (scope, ele, attrs) {
          d3Service.d3().then(function (d3) {

            var renderTimeout;
            var results = scope.resultData;

            var margin = parseInt(attrs.margin) || 20,
              barHeight = parseInt(attrs.barHeight) || 20,
              barPadding = parseInt(attrs.barPadding) || 5;

            var svg = d3.select(ele[0])
              .append('svg')
              .style('width', '100%')
              .style('position', 'absolute');

            $window.onresize = function () {
              scope.$apply();
            };

            A = [1, 1.17, 1.34, 1.49, 1.63, 1.78, 1.93, 2.08];
            B = [1.21, 1.38, 1.55, 1.70, 1.84, 1.99, 2.14, 2.29];
            C = [0.91, 1.08, 1.25, 1.40, 1.54, 1.69, 1.84, 1.99];
            D = [0.47, 0.64, 0.81, 0.96, 1.10, 1.25, 1.4, 1.55];
            //scope.data = [1.78, 1.70, 1.40, 1.25 ];
            scope.data = [
              { x: 3, y: 2.08 },
              { x: 6, y: 2.29 },
              { x: 12, y: 1.99 },
              { x: 18, y: 1.55 }
            ];

            basePoints = [
              { x: 6, y: 0.91, l: "B" },
              { x: 12, y: 0.61, l: "C" }
            ];
            scope.d1 = [
              { x: 3, y: 2.08 },
              { x: 6, y: 2.29 },
              { x: 12, y: 1.99 },
              { x: 15, y: 1.80 }
            ];

            scope.d2 = [
              { x: 3, y: 1.78 },
              { x: 6, y: 1.99 },
              { x: 12, y: 1.69 },
              { x: 15, y: 1.45 }
            ];

            scope.d3 = [
              { x: 3, y: 1.63 },
              { x: 6, y: 1.84 },
              { x: 12, y: 1.54 },
              { x: 15, y: 1.3 }
            ];

            scope.d4 = [
              { x: 3, y: 1.34 },
              { x: 6, y: 1.55 },
              { x: 12, y: 1.25 },
              { x: 15, y: .89 }
            ];

            scope.$watch(function () {
              return angular.element($window)[0].innerWidth;
            }, function () {
              scope.render(scope.data);
            });

            scope.$watch('resultData', function (newData) {
              scope.render(newData);
            }, true);

            scope.render = function (data) {
              svg.selectAll('*').remove();

              if (!data) return;
              if (renderTimeout) clearTimeout(renderTimeout);

              renderTimeout = $timeout(function () {

                var m = [450, 80, 80, 80]; // margins
                var w = d3.select(ele[0])[0][0].offsetWidth - m[0]; // width
                //var h = d3.select(ele[0])[0][0].offsetHeight - m[0]; // height

                var h = 750;
                var line = d3.svg.line()
                  .x(function (d) { return x(d.x); })
                  .y(function (d) { return y(d.y); });

                var width = d3.select(ele[0])[0][0].offsetWidth - margin,
                  height = scope.data.length * (barHeight + barPadding),
                  color = d3.scale.category20();
                var x = d3.scale.log()
                  .domain([5, 15])
                  .range([0, w]),
                  xScale = d3.scale.linear()
                    .domain([0, d3.max(data, function (d) {
                      return d.score;
                    })])
                    .range([0, w]);
                ticks = xScale.ticks();

                ticks.push(6);
                ticks.push(12);


                var y = d3.scale.linear().domain([0, 2.5]).range([h, 0]);
                var yAxisLeft = d3.svg.axis().scale(y).ticks(3).orient("left");
                var xAxis = d3.svg.axis()
                  .scale(x)
                  .orient("bottom")
                  .ticks(10, ",.2s")
                  .tickValues(ticks);


                scope.Areadata = [
                  { x: 4, y: 2.08 },
                  { x: 6, y: 2.29 },
                  { x: 12, y: 1.78 },
                  { x: 16, y: 1.79 },
                ];
                var area = d3.svg.area()
                  .x(function (d) { return x(d.x); })
                  .y0(h)
                  .y1(function (d) { return y(d.y); });




                svg.append('path')
                  .style("stroke", "#A9E2F3")

                  .style("stroke-width", "1")
                  .style("fill", "#A9E2F3")
                  .style('opacity', 0.2)
                  .attr("stroke-width", 0)
                  .attr('d', area(scope.d1));

                // svg.append('path')

                //   .style("fill", "#58D3F7")
                //   .style('opacity', 0.2)
                //   .attr("stroke-width", 0)
                //   .attr('d', area(scope.d2));

                // svg.append('path')
                //   .style("fill", "#A9BCF5")
                //   .style('opacity', 0.2)
                //   .attr("stroke-width", 0)
                //   .attr('d', area(scope.d3));

                svg.append('path')
                  .style("fill", "white")
                  .style('opacity', 1)
                  .attr("stroke-width", 0)
                  .attr('d', area(scope.d4));

                var graph = svg
                  .attr("width", w + m[1] + m[3])
                  .attr("height", h + m[0] + m[2])
                  .append('g')
                  .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

                svg.selectAll(".basesC")
                  .data(basePoints)
                  .enter().append("circle")
                  .attr("class", "basesC")
                  .attr("r", 10)
                  .attr('cx', function (d) { return x(d.x) + 4; })
                  .attr("cy", function (d) { return y(d.y) - 4; })
                  .style("stroke", "black")
                  .style("fill", "none");

                svg.selectAll(".bases")
                  .data(basePoints)
                  .enter().append("text")
                  .attr("class", "bases")
                  .attr('x', function (d) { return x(d.x); })
                  .attr("y", function (d) { return y(d.y); })
                  .text(function (d) { return d.l });





                svg.append('line')
                  .attr("y1", y(0))
                  .attr("y2", y(2.4))
                  .attr("x1", x(6))
                  .attr("x2", x(6))
                  .attr("stroke", "steelblue")
                  .attr("stroke-width", "1");

                svg.append('line')
                  .attr("y1", y(0))
                  .attr("y2", y(2.4))
                  .attr("x1", x(12))
                  .attr("x2", x(12))
                  .attr("stroke", "steelblue")
                  .attr("stroke-width", "1");



                svg.append("rect")
                  .attr("x", 0)
                  .attr("y", 0)
                  .attr("height", h + 30)
                  .attr("width", w + 20)
                  .style("stroke", "black")
                  .style("fill", "none")
                  .style("stroke-width", "4");



                svg.append('g')
                  .attr("class", "x axis")
                  .attr("transform", "translate(10,820)")
                  .style("stroke", "black")
                  .style("fill", "none")
                  .style("stroke-width", "1")
                  .call(xAxis);

                svg.selectAll(".dodoB")
                  .data(B)
                  .enter().append("text")
                  .attr("class", "dodoB")
                  .attr('x', function (d, i) { return x(6); })
                  .attr("y", function (d) { return y(d); })
                  .attr("dx", ".71em")
                  .attr("dy", ".35em")
                  .text(function (d, i) { return i + 1 });



                svg.selectAll(".dodoC")
                  .data(C)
                  .enter().append("text")
                  .attr("class", "dodoC")
                  .attr('x', function (d, i) { return x(12); })
                  .attr("y", function (d) { return y(d); })
                  .attr("dx", ".71em")
                  .attr("dy", ".35em")
                  .text(function (d, i) { return i + 1 });


                svg.append('path')
                  .style("stroke", "blue")
                  .style("fill", "none")
                  .style("stroke-width", "1")
                  .attr('d', line(results.L));

                svg.selectAll(".path")
                  .data(results.L)
                  .enter().append("path")
                  .attr("transform", function (d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; })
                  .attr("d", d3.svg.symbol().type("cross"));

                svg.append('path')
                  .style("stroke", "blue")
                  .style("stroke-dasharray", ("3, 7"))
                  .style("fill", "none")
                  .style("stroke-width", "1")
                  .attr('d', line(results.LG));

                svg.selectAll(".path")
                  .data(results.LG)
                  .enter().append("path")
                  .attr("transform", function (d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; })
                  .attr("d", d3.svg.symbol().type("cross"));

                svg.append('path')
                  .style("stroke", "black")

                  .style("fill", "none")
                  .style("stroke-width", "1")
                  .attr('d', line(results.R));

                svg.selectAll(".path")
                  .data(results.R)
                  .enter().append("path")
                  .attr("transform", function (d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; })
                  .attr("d", d3.svg.symbol().type("triangle-down"));

                svg.append('path')
                  .style("stroke", "black")
                  .style("stroke-dasharray", ("3, 7"))
                  .style("fill", "none")
                  .style("stroke-width", "1")
                  .attr('d', line(results.RG));

                svg.selectAll(".path")
                  .data(results.RG)
                  .enter().append("path")
                  .attr("transform", function (d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; })
                  .attr("d", d3.svg.symbol().type("triangle-down"));

              }, 200);
            };
          });
        }
      }
    }]);

