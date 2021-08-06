(function() {

  const mapOfKeysCallbacks = {

  };

  // The Counter to return to unsubscribe the listeners.
  var listenerCounter = 1;
  window.kiran = window.kiran || {};
  window.kiran.PubSub = {
    removeListener: function(topic) {
      // Topic should be only of type String.
      if (typeof topic !== 'string') {
        throw new Error('Topics should be only of type String accepted.');
      }
      
      // Topic should not be empty.
      if (!topic || !topic.trim()) {
        throw new Error('Please enter a valid topic');
      }
      var splits = topic.split('|');
      const joinedString = splits.slice(1).join('|');
      const currentTopicMap = mapOfKeysCallbacks[joinedString] || [];
      const item = currentTopicMap.find(item => item.subscriberId === topic);
      const index = currentTopicMap.indexOf(item);
      if (index > -1) {
        currentTopicMap.splice(index, 1);
        return true;
      }
      return false;
    },
    getCurrentSubscriberIds: function() {
      return mapOfKeysCallbacks;
    },
    publish: function(topic, data) {
      // Topic should be only of type String.
      if (typeof topic !== 'string') {
        throw new Error('Topics should be only of type String accepted.');
      }
      
      // Topic should not be empty.
      if (!topic || !topic.trim()) {
        throw new Error('Please enter a valid topic');
      }
      const currentTopicMap = mapOfKeysCallbacks[topic] || [];
      if (currentTopicMap.length !== 0) {
        currentTopicMap.forEach(item => {
          try {
            // Sending a Topic also for Post Processing.
            item.callback(topic, data);
          } catch (e) {
            console.error('Unable to process the topic ', e);
          }
        });
      }
      return currentTopicMap.length;
    },
    subscribe: function(topic, callbackFunction) {
      // Topic should be only of type String.
      if (typeof topic !== 'string') {
        throw new Error('Topics should be only of type String accepted.');
      }
      
      // Topic should not be empty.
      if (!topic || !topic.trim()) {
        throw new Error('Please enter a valid topic');
      }

      if (!callbackFunction || typeof callbackFunction !== 'function') {
        throw new Error('Please specify a valid callback function.');
      }

      let currentTopicMap = mapOfKeysCallbacks[topic];
      if (!currentTopicMap) {
        currentTopicMap = [];
        mapOfKeysCallbacks[topic] = currentTopicMap;
      }

      listenerCounter ++;
      const subscriberId = [listenerCounter, topic].join('|');
      currentTopicMap.push({
        subscriberId: subscriberId,
        callback: callbackFunction
      });
      return subscriberId;
    }
  };
})();
