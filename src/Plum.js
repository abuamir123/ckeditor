import './Plum.css'
import jsPlumb from "jsplumb";
import { useEffect, useCallback } from "react";

function Plum() {
    const instance = jsPlumb.jsPlumb.getInstance({});
    instance.setContainer("diagram");
    const handleDrawPlumb = useCallback((instance) => {
        return instance.bind("ready", function () {
            
            instance.registerConnectionTypes({
                "red-connection": {
                    paintStyle: { stroke: "red", strokeWidth: 5 },
                    hoverPaintStyle: { stroke: "red", strokeWidth: 10 },
                    connector:"Flowchart"

                }
            });
            
            instance.draggable("control1", { containment: true });
            instance.draggable("control2", { containment: true });

            
            instance.addEndpoint("control1", {
                endpoint: "Dot",
                anchor: ["RightMiddle"],
                isSource: true,
                connectionType: "red-connection"
            });
            instance.addEndpoint("control3", {
                endpoint: "Dot",
                anchor: ["RightMiddle"],
                anchor: ["LeftMiddle"],
                isTarget: true,
                isSource:true,
                connectionType: "red-connection"
            });
            instance.addEndpoint("control2", {
                endpoint: "Dot",
                anchor: ["LeftMiddle"],
                isTarget: true,
                connectionType: "red-connection"
              });
              instance.addEndpoint("control2", {
                endpoint: "Dot",
                anchor: ["RightMiddle"],
                isSource: true,
                connectionType: "red-connection"
              });
            });
          }, []);
          useEffect(() => {
            handleDrawPlumb(instance);
          }, [handleDrawPlumb, instance]);
        

            return (<div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            <div id="toolbox" className="justify-content-center">
                            </div>
                        </div>
                        <div className="col-md-9">

                            <div className="control" id="control1" style={{ marginLeft: 50, marginTop: 50 }}>Control 1</div>
                            <div className="control" id="control2" style={{ marginLeft: 300, marginTop: 200 }}>Control 2</div>
                            <div className="control" id="control3" style={{ marginLeft: 500, marginTop: 300 }}>Control 3</div>
                        </div>
                    </div>
                </div>
            </div>);
        }

export default Plum;