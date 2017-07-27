import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { getGravatar } from "../helpers/accountsHelper";
import { Button, MenuItem, DropDownMenu } from "@reactioncommerce/reaction-ui";

const GroupsTableCell = ({ account, columnName, group, groups, handleRemoveUserFromGroup, handleUserGroupChange }) => {
  const email = _.get(account, "emails[0].address");

  if (columnName === "name") {
    const name = account.name || email.split("@")[0];
    return (
      <div className="table-cell body-first">
        <img className="accounts-img-tag" src={getGravatar(account)} />
        <span><b>{name}</b></span>
      </div>
    );
  }

  if (columnName === "email") {
    return (
      <div className="table-cell body">
        <span>{email}</span>
      </div>
    );
  }

  if (columnName === "createdAt") {
    return (
      <div className="table-cell body">
        <span>
          {account.createdAt && account.createdAt.toDateString()}
        </span>
      </div>
    );
  }

  if (columnName === "dropdown") {
    if (groups.length === 1) {
      return (
        <p>{_.startCase(groups[0].name)}</p>
      );
    }
    const dropDownButton = (
      <div className="group-dropdown">
        <Button label={group.name && _.startCase(group.name)}>
          &nbsp;<i className="fa fa-chevron-down" />
        </Button>
      </div>
    );

    return (
      <DropDownMenu
        buttonElement={dropDownButton}
        attachment="bottom center"
        onChange={handleUserGroupChange(account)}
      >
        {groups
          .filter((grp) => grp._id !== group._id)
          .map((grp, index) => (
            <MenuItem
              key={index}
              label={_.startCase(grp.name)}
              selectLabel={_.startCase(grp.name)}
              value={grp._id}
            />
          ))}
      </DropDownMenu>
    );
  }

  if (columnName === "button") {
    return (
      <div className="group-table-button">
        <Button
          status="danger"
          onClick={handleRemoveUserFromGroup(account, group._id)}
          bezelStyle="solid"
          i18nKeyLabel="admin.groups.remove"
          label="Remove"
        />
      </div>
    );
  }

  return null;
};

GroupsTableCell.displayName = "GroupsTableCell";

GroupsTableCell.propTypes = {
  account: PropTypes.object,
  columnName: PropTypes.string,
  group: PropTypes.object, // current group in interation
  groups: PropTypes.array, // all available groups
  handleRemoveUserFromGroup: PropTypes.func,
  handleUserGroupChange: PropTypes.func
};

export default GroupsTableCell;
