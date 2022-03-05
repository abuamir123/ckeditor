import './Plum.css'
import jsPlumb from "jsplumb";
import { useEffect, useCallback, useState } from "react";
import 'jquery'
import 'jquery-ui-dist/jquery-ui';
import $ from 'jquery'
import 'jquery-ui/themes/base/core.css';
import 'jquery-ui/themes/base/theme.css';
import 'jquery-ui/themes/base/selectable.css';
import 'jquery-ui/ui/core';
import 'jquery-ui/ui/widgets/selectable';



function Plum() {
    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    var id = uuidv4();



    const [data, setData] = useState(null)
    const [print, setPrint] = useState(false)
    function getData(val) {

        setData(val.target.value)
        setPrint(false)

        console.log(val.target.value)

    }
    const instance = jsPlumb.jsPlumb.getInstance({});
    // const instance1 = jsPlumb.jsPlumb.getInstance({});
    instance.setContainer("diagram");

    const handleDrawPlumb = useCallback((instance) => {
        return instance.bind("ready", function () {

            instance.registerConnectionTypes({
                "red-connection": {
                    paintStyle: { stroke: "red", strokeWidth: 5 },
                    hoverPaintStyle: { stroke: "red", strokeWidth: 10 },
                    connector: "Flowchart"

                }
            });

            instance.draggable("control1", { containment: true });
            instance.draggable("control2", { containment: true });
            instance.draggable("control3", { containment: true });

            $("#toolbox .control").draggable({
                helper: "clone",
                containment: "body",
                appendTo: "#diagram"
            });


            $("#diagram").droppable({
                drop: function (event, ui) {
                    var id = uuidv4();
                    var clone = $(ui.helper).clone(true);
                    clone.attr("id", id);
                    clone.appendTo(this);
                    instance.draggable(id, { containment: true });

                    instance.addEndpoint(id, {
                        endpoint: "Dot",
                        anchor: ["RightMiddle"],
                        isSource: true,
                        connectionType: "red-connection"
                      });

                      instance.addEndpoint(id, {
                        endpoint: "Dot",
                        anchor: ["LeftMiddle"],
                        isTarget: true,
                        connectionType: "red-connection"
                      });
                    }
              
                })



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
                        isSource: true,
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
            // handleDrawPlumb(instance1)
        }, [handleDrawPlumb, instance]);


        return (<div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">

                        <div id="toolbox" className="justify-content-center">
                            {/* <div className="control search"><i class="fa fa-search"></i> search</div>
                        <br></br>
                        <br></br> */}
                            <input type="text" onChange={getData} class="form-control " aria-label="Text input with checkbox"></input>

                            <button type="button" class="btn btn-primary" onClick={() => setPrint(true)}>Add New Element</button>
                            <div className="control search">
                                {
                                    print ?
                                        <div id="control4" className="control search"> {data}</div>
                                        : null
                                }
                            </div>
                        </div>

                    </div>

                    <div className="col-md-9">

                        <div id="diagram" style={{ position: "relative" }}>
                            <div className="control" id="control1" style={{ marginLeft: 50, marginTop: 50 }} >Control 1</div>

                            <div className="control" id="control2" style={{ marginLeft: 300, marginTop: 200 }}>Control 2</div>
                            <div className="control" id="control3" style={{ marginLeft: 500, marginTop: 300 }}>Control 3</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }

export default Plum;