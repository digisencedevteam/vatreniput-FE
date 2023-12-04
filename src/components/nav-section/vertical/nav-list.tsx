import { useState, useEffect, useCallback } from 'react';
import Collapse from '@mui/material/Collapse';
import { usePathname } from 'src/routes/hooks';
import { useActiveLink } from 'src/routes/hooks/use-active-link';
import { NavListProps, NavConfigProps } from '../types';
import NavItem from './nav-item';

type NavListRootProps = {
  data: NavListProps;
  depth: number;
  hasChild: boolean;
  config: NavConfigProps;
};

const NavList = ({ data, depth, hasChild, config }: NavListRootProps) => {
  const pathname = usePathname();
  const active = useActiveLink(data.path, hasChild);
  const externalLink = data.path.includes('http');
  const [open, setOpen] = useState(active);

  useEffect(() => {
    if (!active) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleToggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <NavItem
        item={data}
        depth={depth}
        open={open}
        active={active}
        externalLink={externalLink}
        onClick={handleToggle}
        config={config}
      />
      {hasChild && (
        <Collapse in={open} unmountOnExit>
          <NavSubList data={data.children} depth={depth} config={config} />
        </Collapse>
      )}
    </>
  );
};
export default NavList;

type NavListSubProps = {
  data: NavListProps[];
  depth: number;
  config: NavConfigProps;
};

const NavSubList = ({ data, depth, config }: NavListSubProps) => {
  return (
    <>
      {data.map((list) => (
        <NavList
          key={list.title + list.path}
          data={list}
          depth={depth + 1}
          hasChild={!!list.children}
          config={config}
        />
      ))}
    </>
  );
};
