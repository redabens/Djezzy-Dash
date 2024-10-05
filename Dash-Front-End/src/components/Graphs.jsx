
function Graph1() {
    return (
      <div>
        <h2>Graphique 1</h2>
        <iframe
          src="http://localhost:3000/graph1/"
          style={{ width: '100%', height: '550px', border: 'none' }}
          title="Graph 1"
        />
      </div>
    );
  }
  
  function Graph2() {
    return (
      <div>
        <h2>Graphique 2</h2>
        <iframe
          src="http://localhost:3000/graph2/"
          style={{ width: '100%', height: '500px', border: 'none' }}
          title="Graph 2"
        />
      </div>
    );
  }
  
  function Graph3() {
    return (
      <div>
        <h2>Graphique 3</h2>
        <iframe
          src="http://localhost:3000/graph3/"
          style={{ width: '100%', height: '500px', border: 'none' }}
          title="Graph 3"
        />
      </div>
    );
  }

  export {Graph1,Graph2,Graph3}