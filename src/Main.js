import React from "react";
import { FetchCollection } from "react-parse";
import MyCollectionView from "./MyCollectionView.js";
import Notifications, { notify } from "react-notify-toast";
function Main() {
  return (
    <div>
      <FetchCollection
        schemaName="Post"
        targetName="LastPost"
        onFetchEnd={({ error, status, data, info }) => {
          notify.show(status, null, 1000);
        }}
        onPostEnd={({ error, status, data, info }) => {
          notify.show(status, null, 1000);
        }}
        onPutEnd={({ error, status, data, info }) => {
          notify.show(status, null, 1000);
        }}
        onDeleteEnd={({ error, status, data, info }) => {
          notify.show(status, null, 1000);
        }}
        component={MyCollectionView}
        // // optional:
        // keys=''
        // include=''
        // leaveClean={true} // remove data from store on componentWillUnmount
        // localFirst={false} // fetch data from server only if we can found your data on local store
        // localOnly={false} // never fetch data from server, only find in store
        // autoRefresh={false} // Fetch data after each create/update/delete doc
        // query={object} // 	http://docs.parseplatform.org/rest/guide/#queries
        // order='' // default is '-createdAt', Specify a field to sort by
        // skip={12} // skip first 12 documents
        // limit={50} // limit query to 50 documents
        // enableCount={true} // return the amount of results in db
        // dataHandler={data => data} // Function to manipulate the data before set to store.
        // // Want to pass something to your component, add here
        // userName='Dan' // example
      />
      <Notifications />
    </div>
  );
}

export default Main;
