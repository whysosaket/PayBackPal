import 'package:flutter/material.dart';

void main() {
  runApp(PaybackpalApp());
}

class PaybackpalApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Paybackpal',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: MyHomePage(title: 'PayBackPal'),
    );
  }
}

class Transaction {
  final double amount;
  final String notes;
  String _description;

  Transaction({required this.amount, required this.notes, required String description})
      : _description = description,
        assert(amount != 0.0, 'Amount cannot be 0.0'),
        assert(notes.isNotEmpty, 'Notes cannot be empty'),
        assert(description.isNotEmpty, 'Description cannot be empty');


  String get description => _description;

  // setter for description
  set description(String value) {
    _description = value;
  }
}


class MyHomePage extends StatefulWidget {
  MyHomePage({Key? key, required this.title}) : super(key: key);
  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  Map<String, double> _balances = {}; // Map of person name to outstanding balance
  final TextEditingController _controller = TextEditingController(); // Text controller for text field

  void _addDebt(String person, double debt, String notes) {
  setState(() {
    _balances[person] = _balances[person]! + debt;
  });
}

List<Transaction> _getTransactionHistory(String person) {
  // Implementation for getting transaction history for a given person
  return [];
}



  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: ListView.builder(
        itemCount: _balances.length,
        itemBuilder: (context, index) {
          String person = _balances.keys.elementAt(index);
          double balance = _balances[person]!;
          return ListTile(
            title: Text(person),
            trailing: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text('₹${balance.toStringAsFixed(2)}'),
                IconButton(
                  onPressed: () {
                    _showDeletePersonDialog(context, person); // Show delete person dialog
                  },
                  icon: Icon(Icons.delete),
                ),
              ],
            ),
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => PersonDetailsPage(
                    name: person,
                    balance: balance,
                    transactionHistory: _getTransactionHistory(person).map((t) => t.description).toList(),
                    onAddDebt: (double debt, String notes) {
                      setState(() {
                        _addDebt(person, debt, notes);
                      });
                    },
                  ),
                ),
              );
            },
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          _showAddPersonDialog(context); // Show add person dialog
        },
        tooltip: 'Add Person',
        child: Icon(Icons.add),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.miniStartFloat,
    );
  }

  // Show dialog to add a new person
  void _showAddPersonDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Add Person'),
          content: TextField(
            controller: _controller,
            decoration: InputDecoration(hintText: 'Enter name'),
          ),
          actions: <Widget>[
            TextButton(
              child: Text('Cancel'),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
            TextButton(
              child: Text('Add'),
              onPressed: () {
                setState(() {
                  _balances[_controller.text] = 0.0;
                });
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
  }

  // Show dialog to delete a person
  void _showDeletePersonDialog(BuildContext context, String person) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Delete Person'),
          content: Text('Are you sure you want to delete $person?'),
          actions: <Widget>[
            TextButton(
              child: Text('Cancel'),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
            TextButton(
              child: Text('Delete'),
              onPressed: () {
                setState(() {
                  _balances.remove(person);
                });
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
  }
}

class PersonDetailsPage extends StatelessWidget {
  final String name;
  final double balance;
  final List<String> transactionHistory;
  final void Function(double, String) onAddDebt;

  PersonDetailsPage({
    Key? key,
    required this.name,
    required this.balance,
    required this.transactionHistory,
    required this.onAddDebt,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(name),
      ),
      body: Column(
        children: [
          Text(
            'Outstanding balance: \$${balance.toStringAsFixed(2)}',
            style: TextStyle(fontSize: 24.0),
          ),
          SizedBox(height: 16.0),
          Expanded(
            child: ListView.builder(
              itemCount: transactionHistory.length,
              itemBuilder: (context, index) {
                String transaction = transactionHistory[index];
                return ListTile(
                  title: Text(transaction),
                );
              },
            ),
          ),
          SizedBox(height: 16.0),
          Row(
            children: [
              Expanded(
                child: TextField(
                  decoration: InputDecoration(
                    hintText: 'Enter amount',
                    border: OutlineInputBorder(),
                  ),
                  keyboardType: TextInputType.numberWithOptions(decimal: true),
                  controller: _debtController,
                ),
              ),
              SizedBox(width: 16.0),
              Expanded(
                child: TextField(
                  decoration: InputDecoration(
                    hintText: 'Enter notes',
                    border: OutlineInputBorder(),
                  ),
                  controller: _notesController,
                ),
              ),
              SizedBox(width: 16.0),
              IconButton(
                onPressed: () {
                  double debt = double.tryParse(_debtController.text) ?? 0.0;
                  String notes = _notesController.text.trim();
                  if (debt > 0) {
                    onAddDebt(debt, notes);
                    _debtController.clear();
                    _notesController.clear();
                  }
                },
                icon: Icon(Icons.add),
              ),
            ],
          ),
        ],
      ),
    );
  }

  final TextEditingController _debtController = TextEditingController();
  final TextEditingController _notesController = TextEditingController();
}
