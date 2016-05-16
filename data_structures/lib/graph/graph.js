// Undirected Graph
// ES5 - no ES6 'class'es
'use strict';

function Graph() {
    this.verticies = [];
    this.edges = [];
    this.num_edges = 0;
}

Graph.prototype.add_vertex = function (vertex) {
    this.verticies.push(vertex);
    this.edges[vertex] = [];
};

// Doesn't check for duplicate edges!
// Throws a GraphError if you attempt to add an edge to a missing vertex!
Graph.prototype.add_edge = function (vertex1, vertex2) {
    if (this.verticies.indexOf(vertex1) === -1) {
        let e = Error(`Adding an edge to a vertex: '${vertex1}' that is not yet in the Graph`);
        e.name = 'GraphError';
        throw e;
    }
    if (this.verticies.indexOf(vertex2) === -1) {
        let e = new Error(`Adding an edge to a vertex: '${vertex2}' that is not yet in the Graph`);
        e.name = 'GraphError';
        throw e;
    }
    this.edges[vertex1].push(vertex2);
    this.edges[vertex2].push(vertex1);
    this.num_edges++;
};

Graph.prototype.size = function() {
    return this.verticies.length;
};
Graph.prototype.connectivity = function() {
    return this.num_edges;
};

// Graph.prototype.remove_vertex = function(vertex) {};
// Graph.prototype.remove_edge = function(vertex1, vertex2) {};
// Graph.prototype.depth_first = function(from_vertex) {};
// Graph.prototype.breadth_first = function(from_vertex) {};
// Graph.prototype.find_path = function(from_vertex, to_vertex) {};

Graph.prototype.print = function () {
    console.log(`----------------------------------------------`);
    console.log(`Graph has ${this.connectivity()} connections`);
    var num_v = this.size();
    console.log(`Graph has ${num_v} verticies`);
    for (var v = 0 ; v < num_v ; v += 1) {
        var next_vertex = this.verticies[v];
        console.log(`V[${v}]: ${next_vertex}`);
        var edge_list = this.edges[next_vertex];
        var num_e = edge_list.length;
        console.log(`\tVertex has ${num_e} edges:`);
        for (var e = 0 ; e < num_e ; e += 1) {
            console.log(`\tE[${e}] ${next_vertex} -> ${edge_list[e]}`);
        }
    }
};

var g = new Graph();
var v1 = 1;
var v2 = 2;
var v3 = 3;
var v4 = 4;
var v5 = 5;
// var v1 = 'v1';
// var v2 = 'v2';
// var v3 = 'v3';
// var v4 = 'v4';

g.add_vertex(v1);
g.add_vertex(v2);
g.add_vertex(v3);
g.add_vertex(v4);

g.add_edge(v1, v2);
g.add_edge(v3, v4);
g.add_edge(v2, v3);
g.add_edge(v1, v4);
g.add_edge(v1, v4);
g.add_edge(v1, v4);

g.print();

try {
    console.log('\nAttempting to add an edge to a missing vertex:');
    g.add_edge(v1, v5);
} catch (err) {
    console.log(`[31mThrew exception: ${err.name} - ${err.message}[0m`);
}

    
