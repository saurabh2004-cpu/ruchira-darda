import config from 'src/context/config';
import { CustomizerContext } from 'src/context/CustomizerContext';
import { Link } from 'react-router';
import { ReactComponent as LogoDark } from 'src/assets/images/logos/dark-logo.svg';
import { ReactComponent as LogoDarkRTL } from 'src/assets/images/logos/dark-rtl-logo.svg';
import { ReactComponent as LogoLight } from 'src/assets/images/logos/light-logo.svg';
import { ReactComponent as LogoLightRTL } from 'src/assets/images/logos/light-logo-rtl.svg';
import { styled } from '@mui/material';
import { useContext } from 'react'
import logoPng from 'src/assets/images/logos/ruchira-darda-01.png';


const Logo = () => {
  const { isCollapse, isSidebarHover, activeDir, activeMode } = useContext(CustomizerContext);
  const TopbarHeight = config.topbarHeight;

  const LinkStyled = styled(Link)(() => ({
    height: TopbarHeight,
    width: isCollapse == "mini-sidebar" && !isSidebarHover ? '40px' : '180px',
    overflow: 'hidden',
    display: 'block',
  }));

  if (activeDir === 'ltr') {
    return (
      <LinkStyled to="/" style={{
        display: 'flex',
        alignItems: 'center',
      }}>
        {activeMode === 'dark' ? (
          <LinkStyled to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={logoPng}
              alt="Ruchira Darda Logo"
              height={100} // adjust as needed
              style={{ objectFit: 'contain' }}
            />
          </LinkStyled>
        ) : (
          <LinkStyled to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={logoPng}
              alt="Ruchira Darda Logo"
              height={140} // adjust as needed
              style={{ objectFit: 'contain' }}
            />
          </LinkStyled>
        )}
      </LinkStyled>
    );
  }
  return (
    <LinkStyled to="/" style={{
      display: 'flex',
      alignItems: 'center',
    }}>
      {activeMode === 'dark' ? (
        <LogoDarkRTL />
      ) : (
        <LogoLightRTL />
      )}
    </LinkStyled>
  );
};

export default Logo;
