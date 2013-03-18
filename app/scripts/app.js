var workspace = new VirtualLab.Workspace("container");
var warehouse = new VirtualLab.Warehouse("warehouse");

var tube = new VirtualLab.Item();
//var water = new VirtualLab.Element('water', 50);

//tube.addContent(water);
workspace.add(tube);
warehouse.add(VirtualLab.Item);
warehouse.add(VirtualLab.Item);
warehouse.add(VirtualLab.Item);
//warehouse.add(VirtualLab.Liquid);