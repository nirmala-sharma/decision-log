# Project Name: DecisionLog

### Project Description:
DecisionLog is a web application that allows users to record and manage personal decisions. After registering and logging in, users can create, view, edit, and delete decision entries.

### Purpose:
The purpose of this application is to help users keep track of decisions they make and reflect on them later.

### Intended Users:
Students and individuals who want a simple tool for decision tracking and self-reflection.

### Key Features:
- User registration
- User login
- Create new decision entries
- View existing decisions
- Edit decisions
- Delete decisions


***

---

_________________


## ER Diagram

Below is the Entity Relationship Diagram for DecisionLog:

![DecisionLog ERD](images/erd.png)


***

---

_________________


## Business Rules – DecisionLog

**Relationship 1:** USER creates DECISION

**Cardinality:**
USER (1) : (M) DECISION

**Syntax:**
<entity 1> <minimum> <relationship> <maximum> <entity 2>

**Rules:**
<USER> <may> <create> <many> <DECISION>
A user may create many decisions.

<DECISION> <must> <be created by> <one> <USER>
Each decision must be created by one user.


**Relationship 2:** CATEGORY classifies DECISION

**Cardinality:**
CATEGORY (1) : (M) DECISION

**Syntax:**
<entity 1> <minimum> <relationship> <maximum> <entity 2>

**Rules:**
<CATEGORY> <may> <classify> <many> <DECISION>
A category may classify many decisions.

<DECISION> <must> <belong to> <one> <CATEGORY>
Each decision must belong to one category.

