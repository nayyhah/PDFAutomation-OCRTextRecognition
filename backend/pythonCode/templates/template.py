'''
Classes of all templates
'''

from collections import namedtuple
import json
import re

class template1:
    def __init__(self,dictionary = {}):
        self.dictionary = {}

    def ocr_locations(self):

        OCRLocation = namedtuple("OCRLocation", ["id", "bbox","filter_keywords"])

        OCR_LOCATIONS = [
        OCRLocation("From", (55,155,767,471),
            ["From", "FROM"]),
        OCRLocation("InvoiceInfo", (837, 157, 777, 469),
            ["From"]),
        OCRLocation("ShipTo", (55, 673, 771, 381),
            ["Ship","To", "SHIP","TO"]),
        OCRLocation("SoldTo", (839, 673, 775, 381),
            ["Sold", "To", "Information", "SOLD", "TO", "INFORMATION"]),
        OCRLocation("BillingInfo", (836, 1608, 777, 371),
            ["Sold"]),
        OCRLocation("Product", (55, 1114, 1558, 368),
            ["Sold"]),
        ]

        return(OCR_LOCATIONS)


    def textExtraction(self,dictionary = dict()):
        new_dict = dict()
        for entries in dictionary:
            if entries == 'Product':
                new_dict[entries] = self.tableExtraction(dictionary[entries])
            
            else:
                address_str = ''
                new_dict1 = dict()
                for list_entries in dictionary[entries]:
                    if ':' in list_entries:
                        dict_key = (list_entries.split(':'))[0].strip()
                        dict_value = (list_entries.split(':'))[1].strip()
                        
                        new_dict1[dict_key] = dict_value
                        
                    else:
                        address_str = address_str + str(list_entries) + ' '
                    
                    new_dict1["address"] = address_str

                new_dict[entries] = new_dict1

        return(json.dumps(new_dict, indent=4))
     
    
    def tableExtraction(self, list_entries = list()):
        tablecontent = ''
        for entries in list_entries:
            tablecontent = tablecontent + str(entries) + ' '

        items_units = re.findall('(\d+ PKG)', tablecontent)
        split_content = re.split('\d+ PKG', tablecontent)

        table_contents = dict()

        i = 0
        for items in split_content:
            if items:
                product_dict = dict()

                try:
                    product_dict['harmCode'] = re.findall('(\d{4}\.\d{2}\.\d{4})\s', items)[0]
                    product_dict['uniqueVal'] = re.findall('\s(\d+\.\d+)\s\d+\.\d+', items)[0]
                    product_dict['totalVal'] = re.findall('\s\d+\.\d+\s(\d+\.\d+)', items)[0]
                    product_dict['units'] = items_units[i]
                    i = i + 1

                    # doesn't replace it with empty string...
                    items = re.sub(r'\d{4}\.\d{2}\.\d{4}', '', items)
                    items = re.sub(r'\s(\d+\.\d+)\s\d+\.\d+', '', items)
                    items = re.sub(r'\s(\d+\.\d+)', '', items)
                    product_dict['description'] = items
                    
                    table_contents[product_dict['harmCode']] = product_dict

                except:
                    pass

        return table_contents



'''
Template2
'''

class template2:
    def __init__(self,dictionary = {}):
        self.dictionary = {}

    def ocr_locations(self):

        OCRLocation = namedtuple("OCRLocation", ["id", "bbox","filter_keywords"])

        OCR_LOCATIONS = [
        OCRLocation("Shipping Address", (17,193,330, 154),
            ["Shipping", "Address"]),
        OCRLocation("BillingInfo", (362, 193, 343, 181),
            ["Billing", "Address"]),
        OCRLocation("Product", (11, 488, 708, 419),
            ["Sold"]),
        OCRLocation("CostDetails", (579, 900, 151, 74),
            ["Sold"]),
        ]

        return(OCR_LOCATIONS)


    def textExtraction(self,dictionary = dict()):
        new_dict = dict()
        for entries in dictionary:
            if entries == 'Product':
                new_dict[entries] = self.tableExtraction(dictionary[entries])
            
            else:
                address_str = ''
                new_dict1 = dict()
                for list_entries in dictionary[entries]:
                    if ':' in list_entries:
                        dict_key = (list_entries.split(':'))[0].strip()
                        dict_value = (list_entries.split(':'))[1].strip()
                        
                        new_dict1[dict_key] = dict_value
                        
                    else:
                        address_str = address_str + str(list_entries) + ' '
                    
                    entry = [ele for ele in dictionary[entries] if ele.strip(" ")]
                    dictionary[entries] = entry
                    if address_str:
                        new_dict1["address"] = address_str

                new_dict[entries] = new_dict1
            
        return(json.dumps(new_dict, indent=4))

    
    def tableExtraction(self, list_entries = list()):
        table_contents = dict()

        i = 0
        for items in list_entries:
            if items and not i % 2:
                product_dict = dict()

                try:
            
                    product_dict['price'] = re.findall('[^\-\w]\d+\.{0,1}\d*', items)[0].strip()
                    product_dict['qty'] = re.findall('[^\-\w]\d+\.{0,1}\d*', items)[1].strip()
                    product_dict['total'] = re.findall('[^\-\w]\d+\.{0,1}\d*', items)[2].strip()
                    product_dict['productCode'] = list_entries[i+1]
                    i = i + 1
                    items = re.sub(r'[^\-\w]\d+\.{0,1}\d*', '', items)
                    product_dict['item'] = items
                    # print(product_dict)
                    table_contents[product_dict['productCode']] = product_dict

                except:
                    pass
            else:
                i = i + 1

        return table_contents
