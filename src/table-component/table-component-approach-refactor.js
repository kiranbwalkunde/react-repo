var Table = function (domElement, properties) {

	function createTableHeadElements(currentObject, hasCheckboxes) {
		if (hasCheckboxes) {
			var tableHead = currentObject.currentTable.tHead;
			var thElementLocal = document.createElement('th');
			var checkBox = document.createElement('input');
			checkBox.type = 'checkbox';
			checkBox.name = 'select-all';
			thElementLocal.appendChild(checkBox);
			currentObject.selectAllCheck = checkBox;
			checkBox.addEventListener('change', function () {
				console.log('The Select All has been clicked. ', this);
				var childElements = currentObject.getAllCheckboxes();
				var length = childElements.length;
				var isChecked = this.checked;
				for (var index = 0; index < length; index++) {
					var item = childElements[index];
					item.checked = isChecked;
				}
				var selectedLength = currentObject.getAllSelectedCheckboxes().length;
				currentObject.setCurrentSelectedUsers(selectedLength);
				if (selectedLength !== 0) {
					currentObject.showRemoveButton();
				} else {
					currentObject.hideRemoveButton();
				}
			});
			tableHead.appendChild(thElementLocal);
			// Add Remove Button to delete the selected Items from the Table.
			var secondBody = currentObject.currentTable.tBodies[1];
			var rowElement = document.createElement('tr');
			var tdElement = document.createElement('td');
			tdElement.setAttribute('colspan', currentObject.tableHeaders.length);
			rowElement.appendChild(tdElement);
			var wrapperDiv = document.createElement('div');
			wrapperDiv.className = 'd-flex';
			var removeElementButton = document.createElement('button');
			removeElementButton.className = 'btn btn-danger';
			removeElementButton.type = 'button';
			removeElementButton.innerHTML = 'Remove Selection';
			wrapperDiv.appendChild(removeElementButton);
			wrapperDiv.className = 'text-center';
			tdElement.appendChild(wrapperDiv);
			removeElementButton.style.display = 'none';
			currentObject.removeButtonReference = removeElementButton;
			secondBody.appendChild(rowElement);
			currentObject.removeButtonReference.addEventListener('click', currentObject.removeSelectedItems);
		}
	}

	this.addHeaders = function () {
		if (this.tableHeaders) {
			var tableHead = this.currentTable.tHead;

			// Empty the Table Head.
			tableHead.innerHTML = '';
			createTableHeadElements(this, this.addCheckboxes);
			var totalLength = this.tableHeaders.length;
			for (var index = 0; index < totalLength; index++) {
				var thElement = document.createElement('th');
				thElement.index = index;
				thElement.innerHTML = this.tableHeaders[index];
				thElement.header = this.tableHeaders[index].toLowerCase();
				thElement.addEventListener('click', this.arrangeRowsPerHeader);
				// this.tableHeaders.push(thElement.header);
				// Append the TH Element after the THead.
				tableHead.appendChild(thElement);
				console.debug('The Element has been bound with an event ', thElement);
			}
		}
	}

	this.selectAllCheck = undefined;

	this.removeButtonReference = undefined;

	this.getAllCheckboxes = function () {
		return this.currentTable.querySelectorAll('tbody tr > td:first-child > input[type="checkbox"]');
	}

	this.setCurrentSelectedUsers = function (count) {
		this.currentTable.caption.innerHTML = 'Selected Users are ' + count;
	}

	this.getAllSelectedCheckboxes = function () {
		return this.currentTable.querySelectorAll('tbody tr > td:first-child > input[type="checkbox"]:checked');
	}

	this.renderBodyInTheTable = function (data, append) {
		if (data) {
			// Empty the current body.
			if (!append) {
				this.currentTable.tBodies[0].innerHTML = '';
			}
			var totalLength = data.length;
			for (var index = 0; index < totalLength; index++) {
				this.addRowToTable(data[index]);	
			}
		}
	}

	function addRowToTable(dataRow) {
		var tableRow = document.createElement('tr');
				tableRow.data = dataRow;
				var headLength = this.tableHeaders.length;
				if (this.addCheckboxes) {
					var localTdElement = document.createElement('td');
					var checkBox = document.createElement('input');
					checkBox.type = 'checkbox';
					checkBox.name = 'checks';
					localTdElement.appendChild(checkBox);
					if (this.excludedMsisdn.indexOf(dataRow.msisdn) !== -1) {
						checkBox.checked = true;
					}
					// Bind an event to update Select All and the same Checkbox.
					var currentObject = this;
					checkBox.addEventListener('change', function () {
						if (!this.checked) {
							// As this checkbox has been deselected, select all checkbox make it de-selected.
							currentObject.selectAllCheck.checked = false;
							if (currentObject.getAllSelectedCheckboxes().length !== 0) {
								currentObject.showRemoveButton();
							} else {
								currentObject.hideRemoveButton();
							}
						} else {
							currentObject.showRemoveButton();
						}
						// Update the User Count.
						var allCheckboxes = currentObject.getAllCheckboxes();
						var allCheckboxesSelected = currentObject.getAllSelectedCheckboxes();
						if (allCheckboxes.length === allCheckboxesSelected.length) {
							currentObject.selectAllCheck.checked = true;
						}
						currentObject.setCurrentSelectedUsers(allCheckboxesSelected.length);
					});
					tableRow.appendChild(localTdElement);
				}
				for (var innerIndex = 0; innerIndex < headLength; innerIndex++) {
					var tdElement = document.createElement('td');
					// console.log('The Data, Header Length and final value is ', dataRow, this.tableHeaders[innerIndex], dataRow[headLength[innerIndex]]);
					var dataItem = this.tableHeaders[innerIndex];
					var indexItem = dataItem ? dataItem.toString().toLowerCase() : ''; 
					var value = dataRow[indexItem];
					tdElement.innerHTML = value ? value : '--';
					tableRow.appendChild(tdElement);
				}
				// Lets iterate over the headers and append the data in the table.
				this.currentTable.tBodies[0].appendChild(tableRow);
	}

	this.addRowToTable = addRowToTable.bind(this);

	// The Methods to exclude the MSISDNs from the table being shown.
	this.addMsisdnToExclude = function (msisdns) {

	}

	// This method will set the data and will render all the elements within the same.
	this.setData = function (propData) {
		this.data = propData;
		this.renderBodyInTheTable(this.data);
	}

	this.hideRemoveButton = function () {
		this.removeButtonReference.style.display = 'none';
	}

	this.showRemoveButton = function () {
		this.removeButtonReference.style.display = 'block';
	}

	this.updateChecksCount = function () {
		this.setCurrentSelectedUsers(this.getAllSelectedCheckboxes().length);
	}

	var removeSelected = function () {
		var selectedItems = this.getAllSelectedCheckboxes();
		var lengthOfSelected = selectedItems.length;
		// Iterate over all the selected Checkboxes and delete the data items.
		for (var index = 0; index < lengthOfSelected; index++) {
			var item = selectedItems[index];
			// Delete the data also.
			this.data.splice(item.index, 1);
			console.log('The Remove button has been clicked. ');
			// This is mostly compatible to all the browsers.
			var parentElement = item.parentElement.parentElement;
			// alert('The Parent Element is ' + parentElement);
			if (parentElement.removeNode) {
				parentElement.removeNode(true);
			} else {
				parentElement.remove && parentElement.remove();
			}
		}
		this.updateChecksCount();
		this.hideRemoveButton();
		// As we are deleting the record, the select all should get unchecked.
		this.selectAllCheck.checked = false;
	}

	// This method will iterate over each of the row and will update the checkbox.
	function refreshTableExcludes() {
		var currentTable = this.currentTable.tBodies[0];
		var childElements = currentTable.children;
		var totalLength = childElements.length;
		for (var index = 0; index < totalLength; index ++) {
			var item = childElements[index];
			var itemData = item.data;
			if (this.excludedMsisdn.indexOf(itemData.msisdn) !== -1) {
				var inputItem = item.querySelector('input[type="checkbox"]');
				if (inputItem) {
					inputItem.checked = true;
					this.showRemoveButton();
					this.setCurrentSelectedUsers(this.getAllSelectedCheckboxes().length);
				}
			}
		}
	}

	this.refreshTableExcludes = refreshTableExcludes.bind(this);

	function refreshUpdatedData() {
		var enteredData = [];
		var tableBody = this.currentTable.tBodies[0];
		var childElements = tableBody.children;
		var childLength = childElements.length;
		for (var index = 0; index < childLength; index ++) {
			var childItem = childElements[index];
			enteredData.push(childItem.data);
		}
		// Iterate over current data to see if there is any record new or not.
		var currentDataLength = this.data.length;
		for (var innerIndex = 0; innerIndex < currentDataLength; innerIndex ++) {
			var dataItem = this.data[innerIndex];
			if (enteredData.indexOf(dataItem) === -1) {
				this.addRowToTable(dataItem);
			}
		}
	}

	this.refreshUpdatedData = refreshUpdatedData.bind(this);

	this.removeSelectedItems = removeSelected.bind(this);

	var getDataToCompare = function (headerValue) {
		var tbody = this.currentTable.tBodies[0];
		var childElements = tbody.children;
		var childrenLength = childElements.length;
		var resultArray = [];
		for (var index = 0; index < childrenLength; index++) {
			var item = childElements[index];
			resultArray.push({
				index: index,
				valueToCompare: item.data[headerValue],
				actualElement: item
			});
		}
		return resultArray;
	}

	this.getDataToCompare = getDataToCompare.bind(this);

	var arrangeRowsPerHeader = function (event) {
		var eventTarget = event.target;
		var targetProp = eventTarget.header;
		var resultArray = this.getDataToCompare(targetProp.toLowerCase());
		console.log('The Result Array is ', resultArray);
		// Check if the Column is already sorted.
		var sorted = eventTarget.sorted ? eventTarget.sorted : {};
		var sortedOrder;
		if (sorted.order) {
			sortedOrder = sorted.order === 'ASC' ? {
				order: 'DESC',
				classToAdd: 'bg-warning'
			} : {
				order: 'ASC',
				classToAdd: 'bg-danger'
			};
		} else {
			sortedOrder = {
				order: 'ASC',
				classToAdd: 'bg-danger'
			};
		}
		var ascFunction = function (first, second) {
			if (first.valueToCompare > second.valueToCompare) {
				return 1;
			} else if (first.valueToCompare < second.valueToCompare) {
				return -1;
			}
			return 0;
		};
		var descFunction = function (first, second) {
			if (first.valueToCompare > second.valueToCompare) {
				return -1;
			} else if (first.valueToCompare < second.valueToCompare) {
				return 1;
			}
			return 0;
		};
		if (sortedOrder.order === 'ASC') {
			resultArray.sort(ascFunction);
		} else {
			resultArray.sort(descFunction);
		}
		console.log('The Sorted Result is ', resultArray);
		// alert('The Sorted Array is ' + JSON.stringify(result));
		var totalLength = resultArray.length;
		var tableBody = this.currentTable.tBodies[0];
		for (var index = 0; index < totalLength; index++) {
			var currentItem = resultArray[index];
			if (index !== (currentItem.index + 1)) {
				tableBody.insertBefore(currentItem.actualElement, tableBody.children[index]);
				// alert('Moving' + index + ' to ' + currentItem.index);
			}
		}
		var headElements = this.tableHead.children;
		var headsCount = headElements.length;
		for (var index = 0; index < headsCount; index ++) {
			var item = headElements[index];
			if (item.index !== eventTarget.index) {
				delete item.sorted;
				item.className = '';
				console.log('The Item is not equals to eventTarget', item, eventTarget);
			} else {
				eventTarget.sorted = sortedOrder;
				eventTarget.className = sortedOrder.classToAdd;
			}
		}
	}

	this.arrangeRowsPerHeader = arrangeRowsPerHeader.bind(this);

	var localProperties = properties ? properties : {};
	// The Current Table pointer to point to the DOM element.
	this.currentTable = document.createElement('table');
	// The Class Name to add to the table.
	this.currentTable.className = localProperties.className;
	// PROP: To see if the current Table supports Select All functionality.
	this.addCheckboxes = localProperties.addCheckboxes;

	// Create Head and Body.
	this.tableHead = this.currentTable.createTHead();
	// This is the body for the actual elements to render.
	this.currentTable.createTBody();

	// This is the body to render the Action Buttons in that.
	this.currentTable.createTBody();

	// The Caption to show the information.
	this.currentTable.createCaption();
	// This function call will add the initial headers to the table.
	this.tableHeaders = properties.headers ? properties.headers : ['First', 'Second', 'Third', 'Fourth'];
	this.addHeaders();
	domElement.appendChild(this.currentTable);

	// The Data that will be rendered to the table.
	this.data = [];

	// The MSISDNS which are meant to be excluded from the list.
	this.excludedMsisdn = [];
}
