
/**********************************************************************************************
Prog- 5: This program will generate data to make a comparision between a binary tree and a
sorted list. The data will range from 10 and 100,000. 
 The program will generate data to make the following comparisoins:

    * A comparison of loading each data structure, include a discussion of the big-O required 
	for each of the data structures
    * A comparison of searching for keys(retrieve) in the data structures. Again verify that 
	the searches are O(logN), and discuss which one seems to perform faster for given data sets/sizes
    * Compare how long it takes to perform an insertion as a funciton of the number of items in
	the structure. Verify that the two structures have a different Big-O efficiency here, and state 
	what that efficiency is.
    * Compare how long it takes to empty out the entire data structure. Verify that the two structures
	have a different Big-O efficiency here. and state what that efficiency is. 

  written by: Deepti Sahu
  Date : Nov. 30th, 05

****************************************************************************************************/


#include <iostream>
#include <time.h>
#include <stdlib.h>
#include "prog5.h"
#include "QueType.h"
#include "sorted.h"

using namespace std;

void insertItems ();
void insertAnItem ();
void make_Empty();
void retrieve ();


int main (void)
{
// call one function at a time to find the exact time
  insertItems ();  // calculates time to load data
  insertAnItem ();  // calculates time to insert an item
  make_Empty();  // calculates time to empty the data structure
  retrieve (); // calculates time to search an item
  return 0;
 
}

/***************************************************************
This function inserts random number to the tree and the list
and finds the time required for certain numbers

***************************************************************/

void insertItems ()

{
  TreeType mytree;
  SortedType mysort;
 
  clock_t timer;
  int n;
  int i;
  int j;
  int run = 1000;   // the value of run is changed to find time
 
  srand(time(NULL));
  timer = clock ();
  for ( j=0; j < run; j++)
    {
       n = rand();
       mysort.InsertItem(n); 
    }
  
  timer = clock () - timer;
 
  cout << "seconds(sort): "  << (double)timer/CLOCKS_PER_SEC << endl;

  timer = clock ();
  for (  i=0; i < run; i++)
    {
       n = rand();
       mytree.InsertItem(n);
    }
   
  timer = clock () - timer;
 
  cout << "seconds(tree): "  << (double)timer/CLOCKS_PER_SEC << endl;
 
}


/***********************************************************************
This function finds the time to insert one item into the tree and sorted
list after they are loaded with random numbers.

***********************************************************************/

void insertAnItem ()

{
	TreeType mytree;
	SortedType mysort;
	clock_t timer;
	int i, j, n;
	int run  = 9000;  // the value of run is changed to find time

    for ( j=0; j < run; j++)
		{
		   n = rand();
		   mysort.InsertItem(n); 
		}
	n = rand ();
	timer = clock ();
    mysort.InsertItem(n);
    timer = clock () - timer;
 
   cout << "seconds(after inserting an item in sorted list): "  << (double)timer/CLOCKS_PER_SEC << endl;
  
   for (  i=0; i < run; i++)
    {
       n = rand();
       mytree.InsertItem(n);     
    }
   
   	n = rand ();
	timer = clock ();
	mytree.InsertItem(n);
	timer = clock () - timer;
 
   cout << "seconds(after inserting an item in tree): "  << (double)timer/CLOCKS_PER_SEC << endl;

}

/************************************************************************************************
This function calculates how much time it takes to empty out the whole data structure.

 *********************************************************************************************/

void make_Empty()

{ 
	TreeType mytree;
	SortedType mysort;
	clock_t timer;
	int i, j, n;
	int run  = 8000;   // the value of run is changed to find time

    for ( j=0; j < run; j++)
	   {
		   n = rand();
		   mysort.InsertItem(n); 
		}
	timer = clock ();
	mysort.MakeEmpty();
	timer = clock () - timer;

    cout << "seconds(sorted list _make empty): "  << (double)timer/CLOCKS_PER_SEC << endl;

	 for ( i=0; i < run; i++)
		{
		   n = rand();
		   mytree.InsertItem(n);    
		}
	  timer = clock ();
	  mytree.MakeEmpty();
	  timer = clock () - timer;
 
	 cout << "seconds(tree _ make empty): "  << (double)timer/CLOCKS_PER_SEC << endl;
 
}


/********************************************************************************************
This function calculates the time taken to search an item in a sorted list and in a binary 
tree.
********************************************************************************************/

void retrieve()

{
    TreeType mytree;
    SortedType mysort;
    clock_t timer;
    int i, j, n;
    bool t = false;
    int run  = 9000;    // the value of run is changed to find time
 
    for ( j=0; j < run; j++)
		{
		   n = rand();
		   mysort.InsertItem(n);  
		}

	  n = rand ();
	  timer = clock ();
	  mysort.RetrieveItem(n, t);
	  timer = clock () - timer;
 
	  cout << "seconds(sorted list _retrieve item): "  << (double)timer << endl;
 
	for (  i=0; i < run; i++)
		{
		   n = rand();
		   mytree.InsertItem(n); 
		}

	  n = rand ();
	  timer = clock ();
	  mytree.RetrieveItem(n, t);
	  timer = clock () - timer;
 
	  cout << "seconds(tree _ retrieve item): "  << (double)timer/CLOCKS_PER_SEC << endl;
}

